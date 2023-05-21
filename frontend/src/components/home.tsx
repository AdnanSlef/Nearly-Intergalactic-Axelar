import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { HOME_ABI, HOME_ADDRESS, NEARLY_ADDRESS } from "../utils/constants";
import { handleStop } from "../utils/handleStop";
import useInterval from "../utils/useInterval";
import { BigNumber } from "bignumber.js";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

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

  const handleTakeoff = async () => {
    setSteps((prev) => prev + 1);
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner(0);
    const contract = new ethers.Contract(
      HOME_ADDRESS,
      HOME_ABI,
      signer || provider
    );
    console.log(contract);
    const attachedNear = new BigNumber("1000000000000000000000000").toFixed();
    const profileName = NEARLY_ADDRESS.slice(2).toLowerCase();
    const data = {
      data: {
        [`${profileName}.aurora`]: {
          profile: {
            name: "intergalactic_traveller",
          },
        },
      },
    };
    console.log(JSON.stringify(data));
    const hexStr = ethers.utils.hexlify(
      ethers.utils.toUtf8Bytes(JSON.stringify(data))
    );
    console.log(hexStr);
    const tx = await contract.travelToNear(
      "aurora",
      NEARLY_ADDRESS,
      attachedNear,
      hexStr,
      { value: ethers.utils.parseEther("1") }
    );
    console.log(tx);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <AwesomeButton
        // cssModule={AwesomeButtonStyles}
        type="primary"
        onPress={handleTakeoff}
      >
        Begin Intergalactic Experience!
      </AwesomeButton>
    </div>
  );
}

export default Home;
