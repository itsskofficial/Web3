import { useEffect, useRef, useState } from "react";

import { checkAllowance, increaseAllowance, swapEthToToken, swapTokenToToken, swapTokenToEth } from "@utils/context";
import { CogIcon, ArrowSmDownIcon } from "@heroicons/react/outline";
import SwapField from "./SwapField";
import TransactionStatus from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";
import { weiToEth, ethToWei } from "@utils/helpers";
import { TOKENS } from "@utils/tokens";

const SwapComponent = () => {
  const [tokenA, setTokenA] = useState(TOKENS["ETH"])
  const [tokenB, setTokenB] = useState(TOKENS["USDT"])
  const [inputValue, setInputValue] = useState(0)
  const [outputValue, setOutputValue] = useState(0)

  const inputValueRef = useRef()
  const outputValueRef = useRef()
  const isReversed = useRef(false)
  const [allowanceStatus, setAllowanceStatus] = useState("Increase allowance")
  const [amountStatus, setAmountStatus] = useState("Enter amount")
  const [walletStatus, setWalletStatus] = useState("Connect wallet")
  const [swapStatus, setSwapStatus] = useState("Swap")

  const tokenAObj = {
    id: "tokenA",
    value: inputValue,
    setValue: setInputValue,
    defaultValue: tokenA,
    ignoreValue: tokenB,
    setToken: setTokenA
  }

  const tokenBObj = {
    id: "tokenB",
    value: outputValue,
    setValue: setOutputValue,
    defaultValue: tokenB,
    ignoreValue: tokenA,
    setToken: setTokenB
  }
};

export default SwapComponent;
