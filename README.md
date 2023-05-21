# Intergalactic PioNEARing with Axelar

![](https://raw.githubusercontent.com/AdnanSlef/Nearly-Intergalactic-Axelar/main/frontend/src/assets/x5.png)

## ✨ Inspiration

This cutting-edge technology is enabled by [the release of Aurora Engine 2.9.0](https://aurora.dev/blog/aurora-releases-its-engine-2-9-0-version) on April 21st 2023, which allows Near XCC cross-contract calls from within Aurora EVM. We combine this capability with the power of Axelar GMP to allow users in any EVM or Cosmos chain to make a cross-chain call to NEAR smart contracts.

## 👀 What it does

To showcase this technique, we developed an intergalactic themed passport dApp which allows users to gain a stamp in their passport for each chain they use along the way. Once the space traveler makes it all the way to NEAR, a celebratory social media post is created on Near Social, a smart contract on the NEAR blockchain. Overall, a smart contract on Avalanche (or any other Axelar-supported chain) makes a successful Interchain Message and Cross-Chain Call to a smart contract in the NEAR blockchain.

## 🌌 Example Interchain Transaction to NEAR

1. Using Axelar Explorer, you can see how we sent the transaction using General Message Passing: [Successful Transaction on Axelar Explorer](https://testnet.axelarscan.io/gmp/0x845ef0f0a0e7c8994247794e0f53cb403597598b4253a4617cd797dfd3050dc6:3).
2. That transaction continues on through to NEAR, which is best viewed on NEAR explorer: [Successful Transaction on NEAR Explorer](https://explorer.testnet.near.org/transactions/FxDq5wNQPXdMu9kGPy4A34tNvYab6vVXXuZbyUA6Gnqn).
3. As a result, the social media post requested in the body of the call on Avalanche is successfully posted to a NEAR smart contract, and the results can be viewed on the Near Social website: [Successful Near Social Passport Post Creation](https://test.near.social/#/adb45a7095238ffe7bc93deefb34121404c70c37.aurora/widget/Success).

## 💻 How we built it

We created 2 EVM smart contracts in Solidity, [**HomePlanet.sol**](https://github.com/AdnanSlef/Nearly-Intergalactic-Axelar/blob/main/contracts/HomePlanet.sol) and [**NearlyIntergalactic.sol**](https://github.com/AdnanSlef/Nearly-Intergalactic-Axelar/blob/main/contracts/NearlyIntergalactic.sol). These contracts use Axelar General Message Passing to make a cross-chain call from the Home Planet (any chain supported by Axelar; we used Avalanche) to the Nearly Intergalactic contract in Aurora. This contract uses a version of Aurora SDK that we customized for this purpose ([seen here](https://github.com/AdnanSlef/Nearly-Intergalactic-Axelar/blob/main/contracts/CustomAuroraSdk.sol)) to make an XCC cross-contract call at the NEAR level.

For the front end, we used `React-Typescript` with **`ethers.js`** and MetaMask integration to create an intergalactic traveler passport dApp, showcasing the interchain functionality by awarding the user with a stamp for each chain visited along the way, and finally posting the completed passport to Near Social by successfully making a NEAR call all the way from our Home Planet of Avalanche.

## 🚀 Accomplishments that we're proud of

- We connected two blockchains that were never before possible to connect in this way!
- We demonstrated how to expand the capabilities of Axelar to include support for Interchain calls to NEAR.
- We created a dApp frontend which we enjoy using and which integrates multiple chains.

## Experience learning and using Axelar

✅ The interchain capability allowed us to really bring this idea to life <br/>
✅ Tutorials and docs were really well made so really helped hitting the ground running <br />
✅ AxelarScan made it really easy to visualize the GMP transactions as they went through

➖ When running on testnet, the time seemed to vary from 1 minute 30 to 4 minutes 30 for the same transaction <br />
➖ When AxelarScan errors, it isn't too verbose on the cause of error

## 📈 What's next for Intergalactic PioNEARing with Axelar

We are excited to have been successful in connecting NEAR with Axelar. Some of the next steps we look forward to include:

- Interchain Tokens (ERC-20 to NEP-141)
- Interchain NFTs (ERC-721 to NEP-171)
- Arbitrary Near Cross-Contract Calls
- 2-way GMP Equivalent

## 📄 Links

[Powerpoint Presentation](https://docs.google.com/presentation/d/1MzhE-wqY8uOJVgmnj7XjUpKTt_Ws9L5LhcTpcjd8J6c/edit?usp=sharing)

Thank you! We hope you enjoy our multi-chain, multi technology project which opens more doors in the web3 ecosystem.

## 🧑‍💻 Instructions for testing locally

1. Deploy `NearlyIntergalactic` on Aurora with the following values:

   - nearSocialAccountId = `v1.social08.testnet`
   - wNEAR = `0x4861825E75ab14553E5aF711EbbE6873d369d146`
   - gateway = `0x304acf330bbE08d1e512eefaa92F6a57871fD895`
   - gasReceiver = `0xA2C84547Db9732B27D45c06218DDAEFcc71e452D`

2. Deploy `HomePlanet` on any Axelar-supported chain, such as Avalanche shown here:

   - gateway = `0xC249632c2D40b9001FE907806902f63038B737Ab`
   - gasReceiver = `0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6`

3. Ensure that `NearlyIntergalactic` has the needed `wNEAR`.

4. Use the dApp web UI to begin your journey, which will call `HomePlanet.travelToNear()`:
   - destinationChain = aurora
   - destinationAddress = <`NearlyIntergalactic` address>
   - attachedNear = <Quantity of `wNEAR` to attach, ex. 3000000000000000000000000>
   - data = <Near Social DB, as Bytes Encoded JSON>
   - {msg.value} = 100000000000000000 wei
