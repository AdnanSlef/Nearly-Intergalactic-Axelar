# NEARly Intergalactic Axelar

<div align="center">
  <img src ="https://github.com/AdnanSlef/Nearly-Intergalactic-Axelar/blob/d730afbc78915e5a11d82b7aa44b625c7e8068fd/IT_Logo1.png">
</div>

## Structure

[contracts]()

## Usage

1. Deploy `NearlyIntergalactic` on Aurora with the following values:  
    * nearSocialAccountId = `v1.social08.testnet`  
    * wNEAR = `0x4861825E75ab14553E5aF711EbbE6873d369d146`  
    * gateway = `0x304acf330bbE08d1e512eefaa92F6a57871fD895`  
    * gasReceiver = `0xA2C84547Db9732B27D45c06218DDAEFcc71e452D`  

2. Deploy `HomePlanet` on any Axelar-supported chain, such as Avalanche shown here:  
    * gateway = `0xC249632c2D40b9001FE907806902f63038B737Ab`  
    * gasReceiver = `0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6`  

3. Ensure that `NearlyIntergalactic` has the needed `wNEAR`.

4. Use the dApp web UI to begin your journey, which will call `HomePlanet.travelToNear()`:  
    * destinationChain = aurora  
    * destinationAddress = <`NearlyIntergalactic` address>  
    * attachedNear = <Quantity of `wNEAR` to attach, ex. 3000000000000000000000000>  
    * data = <Near Social DB, as Bytes Encoded JSON>  
    * {msg.value} = 100000000000000000 wei  
