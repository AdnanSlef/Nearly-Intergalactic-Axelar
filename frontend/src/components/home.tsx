import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { HOME_ABI, HOME_ADDRESS } from "../utils/constants";
import { handleStop } from "../utils/handleStop";
import useInterval from "../utils/useInterval";

function Home() {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
      }
    };

    connect();
  }, []);

  const handleSend = async () => {
    setSteps((prev) => prev + 1);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner(0);
    const contract = new ethers.Contract(
      HOME_ADDRESS,
      HOME_ABI,
      signer || provider
    );
    console.log(contract);
    // const attachedNearUInt128 = new BigNumber(attachedNear).toFixed();
    // const tx = await contract.travelToNear(
    //   destinationChain,
    //   destinationAddress,
    //   attachedNearUInt128,
    //   data,
    //   { value: ethers.utils.parseEther("1") }
    // );
    // console.log(tx);
  };

  useInterval(
    async () => {
      if (await handleStop(steps)) {
        setSteps((prev) => prev + 1);
      }
    },
    steps <= 0 ? null : 1000
  );

  return (
    <div>
      <h1>Ethereum React App</h1>
      <div>
        <button onClick={handleSend}>Send Transaction</button>
      </div>
    </div>
  );
}

export default Home;
