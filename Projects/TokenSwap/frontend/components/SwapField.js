import Selector from "./Selector";
import React from "react";

const SwapField = React.forwardRef(({ obj }, inputRef) => {
  const { id, value = "", setValue, defaultValue, ignoreValue, setToken } = obj;
  
  return (
    <div className="flex items-center rounded-xl">
      <input 
        ref={inputRef}
        className="w-full outline-none h-8 px-2 appearance-none text-3xl bg-transparent"
        type={"number"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="0.0" 
      />
      <Selector 
        id={id}
        defaultValue={defaultValue}
        ignoreValue={ignoreValue}
        setToken={setToken}
      />
    </div>
  )
})

export default SwapField;
