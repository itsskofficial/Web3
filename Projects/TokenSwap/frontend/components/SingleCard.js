import { ClipboardCheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import { getTokenAddress, getTokenBalance } from "@utils/context";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const SingleCard = ({index, name, walletAddress}) => {
  const [balance, setBalance] = useState("-")
  const [tokenAddress, setTokenAddress] = useState("")
  const [copyIcon, setCopyIcon] = useState({ icon: ClipboardIcon })

  useEffect(() => {
    if (name && walletAddress) {
      fetchTokenBalance()
      fetchTokenAddress()
    }
    else
      setBalance("-")
  }, [name, walletAddress])

  const fetchTokenBalance = async () => {
    let balance = await getTokenBalance(walletAddress).toString();
    balance = ethers.formatUnits(balance, 18);
    setBalance(balance);
  }

  const fetchTokenAddress = async () => {
    let address = await getTokenAddress();
    setTokenAddress(address);
  }
    
  return (
    <article className="flex flex-col bg-[#212429]">
      <a
        rel="noopener noreferrer"
        href="#"
        aria-label="Token Image"
      >
        <img
          alt=""
          className="object-cover w-full h-62 bg-gray-500"
          src={`img/${index + 1}.png`}
        />
      </a>
      <div className="flex flex-col flex-1 p-6">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Token Link"
        >

        </a>
        <a
          rel="noopener noreferrer"
          href="#"
          className="text-xs tracking-wide uppercase hover:underline text-[#7765f3]"
        >
          {name} 10M Supply
        </a>
        <h3 className="flex-1 py-2 text-lg font-semibold leading-3">
          Get {name} token, limited supply available
        </h3>
        <div className="flex mx-2 pt-[10px]">
          <div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
            <p className="text-sm">
              {name}
            </p>
            <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
              {balance}
            </p>
          </div>
          <div className="flex items-center p-2 px-2 bg-[#7765f3] rounded-r-lg">
            <copyIcon.icon 
              className="h-6 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(tokenAddress)
                setCopyIcon({icon: ClipboardCheckIcon})
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleCard;
