import { useEffect, useRef, useState } from "react";

import { checkAllowance, increaseAllowance, swapEthToToken, swapTokenToToken, swapTokenToEth } from "@utils/context";
import { CogIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import SwapField from "./SwapField";
import TransactionStatus from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";
import { weiToEth, ethToWei } from "@utils/helpers";
import { TOKENS } from "@utils/tokens";
import { useAccount } from "wagmi";

const SwapComponent = () => {
  const [tokenA, setTokenA] = useState(TOKENS["Ethereum"])
  const [tokenB, setTokenB] = useState(TOKENS["Default"])
  const [inputValue, setInputValue] = useState("")
  const [outputValue, setOutputValue] = useState("")

  const inputValueRef = useRef()
  const outputValueRef = useRef()
  const isReversedRef = useRef(false)
  const [swapStatus, setSwapStatus] = useState("Swap")
  const [tokenAState, setTokenAState] = useState()
  const [tokenBState, setTokenBState] = useState()
  const [transactionPending, setTransactionPending] = useState(false)

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

  const notifyError = (message) => toast.error(message, { duration: 5000 })
  const notifySuccess = (message) => toast.success(message, { duration: 5000 })

  const { address } = useAccount()
  
  useEffect(() => {
    if (!address)
      setSwapStatus("Connect wallet")
    else if (!inputValue || !outputValue)
      setSwapStatus("Enter amount")
    else if (!allowanceStatus)
      setSwapStatus("Increase allowance")
    else
      setSwapStatus("Swap")
  }, [address, inputValue, outputValue, allowanceStatus])

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== "tokenA" &&
      !isReversedRef.current
    )
      populateOutputValue(inputValue)
    
    setTokenAState(<SwapField obj={tokenAObj} ref={inputValueRef} />)

    if (inputValue.length === 0) 
      setOutputValue("")
  }, [inputValue, tokenB])
  
  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== "tokenB" &&
      !isReversedRef.current
    )
      populateInputValue(outputValue)
    
    setTokenBState(<SwapField obj={tokenBObj} ref={outputValueRef} />)

    if (outputValue.length === 0) 
      setInputValue("")

    if (isReversedRef.current)
      isReversedRef.current = false
  }, [outputValue, tokenA])

  const handleSwap = async () => {
    if (tokenA === TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"]) {
      performSwap()
    }
    else {
      setTransactionPending(true)
      const result = await checkAllowance(address, tokenA, inputValue)
      setTransactionPending(false)

      if (result)
        performSwap()
      else
        handleInsuffientAllowance()
    }
  }

  const handleIncreaseAllowance = async () => {
    setTransactionPending(true)
    const result = await increaseAllowance(address, tokenA, inputValue)
    setTransactionPending(false)

    
    if (result) {
      notifySuccess("Transaction successful");
      setSwapStatus("Swap");
    } else {
      notifyError("Transaction failed");
      setSwapStatus("Increase allowance");
    }

  }

  const handleReverseExchange = () => {
    isReversedRef.current = true
    setInputValue(outputValue)
    setOutputValue(inputValue)

    setTokenA(tokenB)
    setTokenB(tokenA)
  }

  const getSwapBtnStyle = () => {
    let style = "p-4 w-full my-2 rounded-xl"

    if (swapStatus === "Enter amount" || swapStatus === "Connect wallet") {
      style += " text-zinc-400 bg-zinc-800 pointer-events-none"
    } else {
      style += "bg-blue-700"
    }

    if (swapStatus === "Increase allowance")
      style += " bg-yellow-600"

    return style
  }

  const populateOutputValue = () => {
    if (tokenA === TOKENS["Ethereum"] || tokenB === TOKENS["Ethereum"] || !inputValue) {
      return
    }

    try {
      if (tokenA !== TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"])
        setOutputValue(inputValue)
      else if (tokenA === TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"]) {
        setOutputValue(weiToEth(ethToWei(inputValue, 14)))
      } else if (tokenA !== TOKENS["Ethereum"] && tokenB === TOKENS["Ethereum"]) {
        setOutputValue(weiToEth(ethToWei(inputValue, 14)))
      }
    } catch (error) {
      setOutputValue("")
    }
  }

  const populateInputValue = () => {
    if (tokenA === TOKENS["Ethereum"] || tokenB === TOKENS["Ethereum"] || !outputValue) {
      return
    }

    try {
      if (tokenA !== TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"])
        setInputValue(outputValue)
      else if (tokenA === TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"]) {
        setInputValue(weiToEth(ethToWei(outputValue, 14)))
      } else if (tokenA !== TOKENS["Ethereum"] && tokenB === TOKENS["Ethereum"]) {
        setInputValue(weiToEth(ethToWei(outputValue, 14)))
      }
    } catch (error) {
      setInputValue("")
    }
  }

  const performSwap = async () => {
    setTransactionPending(true)
    let result

    if (tokenA === TOKENS["Ethereum"] && tokenB !== TOKENS["Ethereum"]) {
      result = await swapEthToToken(address, tokenB, inputValue)
    } else if (tokenA !== TOKENS["Ethereum"] && tokenB === TOKENS["Ethereum"]) {
      result = await swapTokenToEth(address, tokenA, inputValue)
    } else {
      result = await swapTokenToToken(address, tokenA, tokenB, inputValue)
    }

    setTransactionPending(false)

    if (result && !result.hasOwnProperty("transactionHash")) {
      notifyError("Transaction failed")
    } else {
      notifySuccess("Transaction successful");
    }
  }

  const handleInsuffientAllowance = () => {
    notifyError("Insufficient allowance")
    setSwapStatus("Increase allowance")
  }

  return (
    <div className="border-[1px] rounded-l border-[#7765f3] bg-[#7765f3] w-[100%] p-4 px-6 rounded-xl">
      <div className="flex items-center justify-between py-4 px-1">
        <p>
          Swap
        </p>
        <CogIcon className="h-6" />
      </div>
      <div className="relative bg-[#212429] p-4 py-6 roudned-xl mb-2 border-[2px] border-transparent hover:border-zinc-600">
        {tokenAState}
        <ArrowDownIcon
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212429] rounded-full text-[#7765f3] cursor-pointer hover:scale-110"
          onClick={handleReverseExchange}
        />
      </div>
      <div className="bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600">
        {tokenBState}
      </div>
      <button 
        className={getSwapBtnStyle()}
        onClick={() => {
        if (swapStatus === "Increase allowance")
          handleIncreaseAllowance()
        else if (swapStatus === "Swap")
          handleSwap()
        }}
      >
        {swapStatus}
      </button>
      { transactionPending && <TransactionStatus /> }
      <Toaster />
    </div>
  )
};

export default SwapComponent;
