import React, { useContext, useState } from "react";

const AppContext = React.createContext();
export const AppProvider = ({ children }) => {
  const [propsObj, setPropsObj] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [name,setName] = useState("")
  const [discordID, setDiscordID] = useState("")
  const [githubURL, setGithubURL] = useState("")
  const [twitterHandle, setTwitterHandle] = useState("")


  return (
    <AppContext.Provider
      value={{
        propsObj,
        setPropsObj,
        isModalOpen,
        setModalOpen,
        isConnected,
        setConnected,
        walletAddress,
        setWalletAddress,
        name,
        setName,
        discordID,
        setDiscordID,
        githubURL,
        setGithubURL,
        twitterHandle,
        setTwitterHandle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => useContext(AppContext);
