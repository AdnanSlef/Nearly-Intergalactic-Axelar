import { BigNumber } from "bignumber.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { HOME_ABI, HOME_ADDRESS, NEARLY_ADDRESS } from "../utils/constants";
import { handleStop } from "../utils/handleStop";
import useInterval from "../utils/useInterval";
import ImageComponent from "./slide";

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
          widget: {
            Success: {
              "": 'return (\n  <img src="https://raw.githubusercontent.com/AdnanSlef/Nearly-Intergalactic-Axelar/main/frontend/src/assets/x5.png"></img>\n);\n',
              metadata: {
                name: "Success",
                image: {
                  url: "https://raw.githubusercontent.com/AdnanSlef/Nearly-Intergalactic-Axelar/d730afbc78915e5a11d82b7aa44b625c7e8068fd/IT_Logo1.png",
                },
              },
            },
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
      { value: ethers.utils.parseEther("0.1") }
    );
    console.log(tx);
  };

  useInterval(
    async () => {
      if (await handleStop(steps)) {
        setSteps((prev) => prev + 1);
      }
    },
    steps <= 0 ? null : 3000
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="title text-white text-center font-bold">
        AXELAR INTERGALACTIC PORTAL
      </h1>
      <ImageComponent index={steps} />
      {steps <= 3 ? (
        <AwesomeButton
          className="my-3"
          type="danger"
          onPress={handleTakeoff}
          disabled={steps > 0}
        >
          <p className="text-white font-extrabold">
            Begin Intergalactic Experience!
          </p>
        </AwesomeButton>
      ) : (
        <div className="my-3">
          <p className="text-white font-semibold text-lg">
            {`Congratulations! 🎉 Your journey has been shared to `}
            <a
              href={`https://test.near.social/#/${NEARLY_ADDRESS.slice(
                2
              ).toLowerCase()}.aurora/widget/Success
`}
              className="text-blue-500"
            >
              Near Social
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
