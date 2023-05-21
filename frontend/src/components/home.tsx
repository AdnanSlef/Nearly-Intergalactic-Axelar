import { useState, useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constants";
import { BigNumber } from "bignumber.js";

function Home() {
  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<Contract>();
  const [account, setAccount] = useState("");
  const [sourceChain, setSourceChain] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [attachedNear, setAttachedNear] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(await window.ethereum.enable());
        setWeb3(web3Instance);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      if (web3) {
        const contractInstance = new web3.eth.Contract(
          CONTRACT_ABI as AbiItem[],
          CONTRACT_ADDRESS
        );
        setContract(contractInstance);
      }
    };

    initContract();
  }, [web3]);

  const handleConnect = async () => {
    console.log("HELLO");
    if (!web3) {
      return;
    }
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]); // Set the first account as the selected account
  };

  const handleSend = async () => {
    if (!web3 || !contract) {
      return;
    }

    // Convert attachedNear to uint128
    const attachedNearUInt128 = new BigNumber(attachedNear).toFixed();

    const payload = web3.utils.utf8ToHex(data);

    const tx = await contract.methods.send(
      destinationChain,
      destinationAddress,
      attachedNearUInt128,
      payload
    );
    console.log("tx:", tx);
    console.log(await web3.currentProvider);
    console.log(contract);
    const receipt = await tx.send({
      from: account,
      gas: await tx.estimateGas(),
    });
    console.log("rec:", receipt);
  };

  return (
    <div>
      <h1>Ethereum React App</h1>
      {web3 ? (
        <div></div>
      ) : (
        // <div>
        //   <p>Connected Account: {account}</p>
        //   <p>Source Chain: {sourceChain}</p>
        //   <p>Source Address: {sourceAddress}</p>
        //   <p>Destination Chain:</p>
        //   <input
        //     type="text"
        //     value={destinationChain}
        //     onChange={(e) => setDestinationChain(e.target.value)}
        //   />
        //   <p>Destination Address:</p>
        //   <input
        //     type="text"
        //     value={destinationAddress}
        //     onChange={(e) => setDestinationAddress(e.target.value)}
        //   />
        //   <p>Attached NEAR:</p>
        //   <input
        //     type="text"
        //     value={attachedNear}
        //     onChange={(e) => setAttachedNear(e.target.value)}
        //   />
        //   <p>Data:</p>
        //   <textarea
        //     value={data}
        //     onChange={(e) => setData(e.target.value)}
        //   ></textarea>
        //   <br />
        //   <button onClick={handleSend}>Send Transaction</button>
        // </div>
        <button onClick={handleConnect}>Connect to Web3</button>
      )}
    </div>
  );
}

export default Home;
