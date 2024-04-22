"use client"
import React, { useState } from 'react'
import { createContext,useContext } from 'react'

const context = createContext();
const { Provider } = context;

export const WalletProvider = ({children}) => {
    const [WalletConnected, setWalletConnected]=useState(false);
  return (
    <Provider
    value={{
        WalletConnected,
        setWalletConnected
    }}>
        {children}
    </Provider>
  )
}


const useWallet=()=>useContext(context);

export default useWallet;
