"use client";

import { Event, getEventHash, signEvent, UnsignedEvent } from "nostr-tools";
import {
  finalizeEvent,
  generateSecretKey,
  getPublicKey,
  verifyEvent,
} from "nostr-tools/pure";
import { Relay } from "nostr-tools/relay";
import { useAuth } from "@/context/useAuth";
import { usePool } from "@/context/usePool";

const usePublish = () => {
  const { user, publicKey, privateKey, loginWithPublicKey, logout } = useAuth();
  const { relays, subscribeToRelays, list, publishToRelay } = usePool();

  const userData = user;

  return ({ content, kind, tags }) => {
    return new Promise(async (resolve, reject) => {
      const pubkey = userData ? publicKey : " 01f146ce0416a4b470c6815bc0f7b5b141072cb19ada0bd759f92d497fd76b45";
      const pk = privateKey || "";

      if (!pubkey) {
        reject(new Error("No public key provided"));
      }

      const unsignedEvent = {
        pubkey,
        created_at: Math.floor(Date.now() / 1000),
        content: JSON.stringify(content) || "",
        tags: tags || [],
        kind,
      };

      const signedEvent = pk
        ? {
            ...unsignedEvent,
            id: getEventHash(unsignedEvent),
            sig: finalizeEvent(unsignedEvent, pk),
          }
        : {};

      if (!signedEvent.sig) {
        reject(new Error("No signature provided"));
      }

      let event = finalizeEvent({
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'hello',
      }, pk)
      
      let isGood = verifyEvent(event)

      //   await relay.publish(signedEvent);
      const sub = subscribeToRelays();
      const pub = await publishToRelay(signedEvent);
      console.log("publish event",pub)
    //   pub.on("ok", () => {
    //     resolve(signedEvent);
    //   });
    });
  };
};

export default usePublish;
