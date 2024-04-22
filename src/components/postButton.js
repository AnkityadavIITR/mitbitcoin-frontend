"use client";
import React from "react";
import { useNostr, dateToUnix } from "nostr-react";
// import { getEventHash, getPublicKey} from 'nostr-tools';
import { getEventHash, getPublicKey, signEvent } from "nostr-tools";

const PostButton = () => {
  const { publish } = useNostr();

  const onPost = async () => {
    const privKey = prompt("Paste your private key:");

    if (!privKey) {
      alert("No private key provided");
      return;
    }

    const message = prompt("Enter the message you want to send:");

    if (!message) {
      alert("No message provided");
      return;
    }

    const event = {
      content: message,
      kind: 1,
      tags: [],
      created_at: dateToUnix(),
      pubkey: getPublicKey(privKey),
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, privKey);

    publish(event);
  };

  return (
    <div className="flex">
      <button
        onClick={onPost}
        className="bg-orange-500 text-white py-2 px-4 container w-[300px] rounded-lg mx-auto"
      >
        Post a Message!
      </button>
    </div>
  );
};

export default PostButton;
