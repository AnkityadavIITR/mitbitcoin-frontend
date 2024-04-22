"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { getPublicKey } from "nostr-tools";

const AuthContext = createContext({
  user: null,
  publicKey: null,
  privateKey: null,
  loginWithPublicKey: () => {},
  loginWithPrivateKey: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPublicKey(parsedUser.publicKey);
      setPrivateKey(parsedUser.privateKey);
    }
  }, []);

  const loginWithPublicKey = (newPublicKey) => {
    setUser({ data: { publicKey: newPublicKey } });
    setPublicKey(newPublicKey);
    localStorage.setItem("user", JSON.stringify({ publicKey: newPublicKey }));
  };

  const loginWithPrivateKey = (newPrivateKey) => {
    const newPublicKey = getPublicKey(newPrivateKey);
    setUser({ data: { publicKey: newPublicKey, privateKey: newPrivateKey } });
    setPublicKey(newPublicKey);
    setPrivateKey(newPrivateKey); // Optional based on use case
    localStorage.setItem(
      "user",
      JSON.stringify({ publicKey: newPublicKey, privateKey: newPrivateKey })
    );
  };

  const setIntialState = (newPublicKey, newPrivateKey) => {
    setPublicKey(newPublicKey);
    setPrivateKey(newPrivateKey);
        setUser({ data: { publicKey: newPublicKey, privateKey: newPrivateKey } });

  };

  const logout = () => {
    setUser(null);
    setPublicKey(null);
    setPrivateKey(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    publicKey,
    privateKey,
    setIntialState,
    loginWithPublicKey,
    loginWithPrivateKey,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
