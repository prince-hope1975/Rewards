# Prince's - Reward Implementatiion Software for (OSS)

## PROJECT DESCRIPTION
The project rund on Etherum Rinkeby testnet and enables the user to either draw an NFT in the app or upload an NFt

## PREREQUISITES
- Have a metamask account
- Make sure your wallet is funded with eth

## RUN ON YOUR LOCAL MACHINE 
- `git clone` the repository
- `cd` into the repository 
 ```bash
 cd reward
 ```
 - ` Create` a `.env.local` file in the root directory
 ```bash
  touch .env.local
  # or
  echo .env.local 
  ```
  - Insert the following variables in the `env.local` file and fill in the env variables
  ```bash
  NEXT_PUBLIC_PURESTAKE_API_KEY =
  NEXT_PUBLIC_SEED_PHRASE =
  ```

- Install dependencies
 ```bash
   npm install 
   # or
   yarn add
 ```

- `Start` development server

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Functionalities
- [x] User have to send $choice before generating NFT.
- [x] User can create their own NFT in app.
- [x] User has option to upload image file before generating or creating NFT.
- [x] User have to input image title to set metadata.
- [x] User have to connect either algosigner or my algowallet before generating NFT.



## Technology used
- Thirdweb
- Ethers js
- Next.js
- TailwindCSS
- NodeJs
- Algorand 
- Pinata Api

## Lion NFT 
<img src="./Lion.png">

preview the site <a href="">here# Nft

# Nft
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.