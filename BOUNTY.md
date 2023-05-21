## Axelar GMP for sending Interchain Messages / Tokens

### Example Interchain Transaction to NEAR

1. Using Axelar Explorer, you can see how we sent transaction using the General Message Protocol: [Successful Transaction on Axelar Explorer](https://testnet.axelarscan.io/gmp/0x845ef0f0a0e7c8994247794e0f53cb403597598b4253a4617cd797dfd3050dc6:3).
2. That transaction continues on through to NEAR, which is best viewed on NEAR explorer: [Successful Transaction on NEAR Explorer](https://explorer.testnet.near.org/transactions/FxDq5wNQPXdMu9kGPy4A34tNvYab6vVXXuZbyUA6Gnqn).
3. As a result, the social media post requested in the body of the call on Avalanche is successfully posted to a NEAR smart contract, and the results can be viewed on the Near Social website: [Successful Near Social Passport Post Creation](https://test.near.social/#/adb45a7095238ffe7bc93deefb34121404c70c37.aurora/widget/Success).

### Source Code

#### Smart Contracts

- The `/contracts` directory contains the Solidity smart contracts - `HomePlanet.sol` and `NearlyIntergalactic.sol` - that were uploaded via Remix to Avalanche and Aurora respectively
- These two smart contracts acts as `AxelarExecutable` and handle to the to-and-from of the Axelar GMP call
- The `CustomAuroraSdk.sol` is what we use on the Aurora side to connect it with NEAR smart contracts

#### Intergalactic Passport dApp

- The `/frontend` directory contains all the React - Typescript frontend code
- The dApp connects to your wallet, and allows you to send the transaction from the Avalanche side that will make its way to NEAR side via Aurora
- As we go through the different chains, the traveler's passport will be updated with the chain's stamp
- At the end, the transaction completes by making a post to Near Social

### Experience learning and using Axelar

`+` The interchain capability allowed us to really bring this idea to life <br/>
`+` Tutorials and docs were really well made so really helped hitting the ground running <br />
`+` AxelarScan made it really easy to visualize the GMP transactions as they went through

`-` When running on testnet, the time seemed to vary from 1 minute 30 to 4 minutes 30 for the same transaction <br />
`-` When AxelarScan errors, it isn't too verbose on the cause of error
