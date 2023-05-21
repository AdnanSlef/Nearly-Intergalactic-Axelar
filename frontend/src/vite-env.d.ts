/// <reference types="vite/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare module "react-identicons";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
