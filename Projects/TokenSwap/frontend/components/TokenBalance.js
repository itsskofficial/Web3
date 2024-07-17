import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import {
  ClipboardIcon,
  ClipboardCheckIcon,
  PlusIcon
} from "@heroicons/react/outline";
import { TransactionStatus } from "@components/TransactionStatus";
import {
  getTokenAddress, 
  getTokenBalance,
 } from "@utils/context";

const TokenBalance = ({name, walletAddress}) => {
  const [balance, setBalance] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [copyIcon, setCopyIcon] = useState(<ClipboardIcon className="h-5 w-5" />);
  const [transactionPending, setTransactionPending] = useState(false);

  const fetchTokenBalance = async () => {
    let balance = await getTokenBalance(walletAddress).toString();
    balance = ethers.formatUnits(balance, 18);
    setBalance(balance);
  }

  const fetchTokenAddress = async () => {
    const address = await getTokenAddress(name);
    setTokenAddress(address);
  }

  useEffect(() => {
    if (name && walletAddress) {
      fetchTokenBalance();
      fetchTokenAddress();
    } else {
      setBalance(0);
    }
  }, [name, walletAddress]);

  return (
    <div className="flex mx-2 border-[1px] rounded-l rounded-r-lg border-[#7765f3]">
        <div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
            <p className="text-sm">
                {name}         
            </p>
            <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
                {balance}
            </p>
          </div>
          <div>
              <copyIcon.icon
                  className="h-6 cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(tokenAddress);
                        setCopyIcon(<ClipboardCheckIcon className="h-5 w-5" />);
                        setTimeout(() => {
                            setCopyIcon(<ClipboardIcon className="h-5 w-5" />);
                        }, 2000);
                    }}
              />
              {transactionPending && <TransactionStatus />}
          </div>
    </div>
  )
};

export default TokenBalance;