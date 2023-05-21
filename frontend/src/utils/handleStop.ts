import { ethers } from "ethers";
import {
  HOME_ABI,
  HOME_ADDRESS,
  NEARLY_ABI,
  NEARLY_ADDRESS,
} from "./constants";

export const handleStop = async (step: number): Promise<boolean> => {
  if (step <= 0) {
    return false;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  if (step <= 2) {
    const contract = new ethers.Contract(HOME_ADDRESS, HOME_ABI, provider);
    let result = false;
    if (step === 1) {
      result = await contract.visitedAvalancheStamp();
    } else {
      result = await contract.visitedAxelarStamp();
    }
    console.log(step, result);
    return result;
  }
  if (step === 3) {
    const contract = new ethers.Contract(NEARLY_ADDRESS, NEARLY_ABI, provider);
    const result = await contract.visitedAuroraStamp();
    console.log(step, result);
    return result;
  }
  return false;
};
