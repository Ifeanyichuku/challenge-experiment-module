// src/utils/wallet.js or wherever you keep it
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectMetamask = async () => {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    toast.error("No MetaMask detected. Please install MetaMask to continue.");
    return null;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { signer, provider };
  } catch (error) {
    console.error("MetaMask connection error:", error);
    toast.error("Failed to connect MetaMask.");
    return null;
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    toast.error("MetaMask not detected.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No MetaMask accounts found");
    }
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    toast.error("Unable to check wallet connection.");
  }
};
