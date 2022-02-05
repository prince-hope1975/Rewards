import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import algosdk from "algosdk";

import { useGlobalContext } from "../components/context";
import Header from "../components/header";
import defaultRewardArray from "../components/defaultRewardArray";

// Variables needed to connect to the algorand testnet
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-key": process.env.NEXT_PUBLIC_PURESTAKE_API_KEY,
};

// Take the above variables and make a connection to Algorand testnet
// using the algosdk
let algodClient = new algosdk.Algodv2(token, baseServer, port);

export default function Proposals() {
  const router = useRouter();

  // Get account mnemonic using the seed phrase
  const recoveredAccount = algosdk.mnemonicToSecretKey(
    process.env.NEXT_PUBLIC_SEED_PHRASE
  );

  // import the variables fromt he global context file
  // Located at /components/context.js
  const { setPropsObj, propsObj } = useGlobalContext();

  const [addressArray, setAddressArray] = useState([]);
  const [amount, setAmount] = useState(0);
  const [tablecontent, setTablecontent] = useState([]);
  const [arr, setArr] = useState([])

  const processPaymentTransaction = async (
    _address: string,
    _amount: number = 1
  ) => {
    try {
      let params = await algodClient.getTransactionParams().do();

      let amount = Math.floor(_amount * 1000);

      let txn = {
        from: recoveredAccount.addr,
        to: _address,
        fee: 1,
        amount: amount,
        firstRound: params.firstRound,
        lastRound: params.lastRound,
        genesisID: params.genesisID,
        genesisHash: params.genesisHash,
        note: new Uint8Array(0),
      };

      let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
      let sendTx = await algodClient.sendRawTransaction(signedTxn.blob).do();

      console.log("Transaction : " + sendTx.txId);
      return true;
    } catch (err) {
      console.log("Failed to process transaction: ", err);
      return false;
    }
  };

  useEffect(() => {
    let storage = localStorage.getItem("rewardsList");
    if (!storage) {
      localStorage.setItem("rewardsList", JSON.stringify(defaultRewardArray));
      storage = localStorage.getItem("rewardsList");
    }
    setPropsObj(JSON.parse(storage));
  }, []);
  useEffect(() => {
    setArr([...tablecontent,...arr])
  }, [tablecontent]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (addressArray.length < 1) return;
    let placeHolderArray = [];
    let finalArr = addressArray.map((_addr) => {
      return { name: "Unknown", wallet_Address: _addr, status: false };
    });

    finalArr.forEach(({ wallet_Address }, index) => {
      propsObj.forEach((item) => {
        if (wallet_Address === item.wallet_Address) {
          finalArr[index] = { ...item, status: true };
        }
      });
    });

    finalArr.forEach(async ({ wallet_Address, status }, index) => {
      if (!status) {
        placeHolderArray.unshift({ ...finalArr[index] });
        setTablecontent([{ ...finalArr[index] }, ...tablecontent]);
      } else {
        const state = await processPaymentTransaction(wallet_Address, amount);
        finalArr[index] = { ...finalArr[index], status: state };
        placeHolderArray.unshift({ ...finalArr[index] });
        
        setTablecontent([{ ...finalArr[index] }, ...tablecontent]);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Pay</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className={`pt-4  text-gray-900 flex items-center flex-col `}>
        <div className="flex justify-evenly text-3xl mb-4 uppercase w-full text-center">
          Pay Active Participants
        </div>
        <p className="p-4 overflow-auto w-full">
          RWXX2OACYFWOH7JKS5W6HLFDXUC6GLI6MYUJTAQ5B4VH6ZFS5LQSS6MJ2I,ILSYSYHSCMQ4KSVGQEDODDA4N6ZF4CRPQASYWJBV2T5RF2FZQQKTFB5GW4,IAWNDP5OXXP7BD7I7QUMUOF35SM3IZWUW755HHDJK2VK25D7TLJY2UZGUE
        </p>
        <form className="flex items-center justify-center flex-col space-y-10">
          <textarea
            onChange={(e) =>
              setAddressArray([...e.target.value.split(/[ ,]+/)])
            }
            className=""
            placeholder="Copy and paste a list of addresses here"
          ></textarea>

          <span className="space-y-3 flex">
            <p>Choice Amount :</p>{" "}
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              className="outline-none border-2 border-gray-700 px-2"
            />
          </span>
          <input
            type="submit"
            value="Pay"
            onClick={handlePayment}
            className="border-2 border-gray-500 hover:border-gray-900 hover:shadow-lg cursor-pointer p-2"
          />
        </form>
      </section>
      <section className="text-gray-900">
        <h1 className="text-center uppercase mt-10 border-2 border-gray-700 py-4">
          Disbursment Status
        </h1>
        <div className={`w-full flex  justify-evenly capitalize  `}>
          <span className="py-3 w-full text-center border-2 border-gray-700 bg-purple-200">
            Name{" "}
          </span>
          <span className="py-3 w-full text-center border-2 border-gray-700  bg-purple-200">
            wallet Address
          </span>
          <span className="py-3 w-full text-center border-2 border-gray-700 bg-purple-200 ">
            Status{" "}
          </span>
        </div>
        {arr &&
          arr.map(({ name, wallet_Address, status },index) => {
            return (
              <div
                key={index}
                className={`w-full  flex items-center justify-evenly text-gray-900`}
              >
                <span
                  key={`${index}1`}
                  className="border-2 border-gray-700 w-full text-center"
                >
                  {" "}
                  {name}
                </span>
                <span
                  key={`${index}2`}
                  className="border-2 border-gray-700 w-full text-center"
                >
                  {wallet_Address.substring(0, 5)}...
                  {wallet_Address.substring(
                    wallet_Address.length - 7,
                    wallet_Address.length - 1
                  )}
                </span>
                <span
                  key={`${index}3`}
                  className={`border-2 border-gray-700 w-full text-center ${
                    status === true ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {" "}
                  {status
                    ? "Success"
                    : status === false
                    ? "Failure"
                    : `${status}`}
                </span>
              </div>
            );
          })}
      </section>
    </>
  );
}
