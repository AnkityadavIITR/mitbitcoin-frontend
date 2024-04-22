"use client";

import { Event, Filter, Pub, SimplePool, Sub } from "nostr-tools";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./useAuth";
const PoolContext = createContext({
  pool: {
    relays: [],
    sub: () => {},
    list: () => {},
    publish: () => {},
  },
});

// const pool = new SimplePool(); // Create the pool instance

const PoolProvider = ({ children }) => {
  const [pool, setPool] = useState(new SimplePool());
  const { user, publicKey, privateKey, loginWithPublicKey, logout } = useAuth();
  useEffect(() => {
    setPool(new SimplePool()); // Recreate pool on every render for updates
  }, []);

  const relays = [
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://eden.nostr.land",
    "wss://relay.nostr.info",
    "wss://offchain.pub",
    "wss://nostr-pub.wellorder.net",
    "wss://nostr.fmt.wiz.biz",
    "wss://nos.lol",
  ];

  const subscribeToRelays = () => {
    const subscription = pool.subscribeMany(
      relays,
      [
        {
          authors: privateKey,
        },
      ],
      {
        onevent(event) {
          // this will only be called once the first time the event is received
          // ...
        },
        oneose() {
          subscription.close();
        },
      }
    );
  };
  const list = (filters) => pool.list(relays, filters);
  const publishToRelay = async (event) => {
    await Promise.any(pool.publish(relays, event));
    // let events = await pool.querySync(relays, { kinds: [0, 1] })
    console.log("published to at least one relay!",events);
  };

  const value = { relays, subscribeToRelays, list, publishToRelay };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

const usePool = () => {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { PoolProvider, usePool };
