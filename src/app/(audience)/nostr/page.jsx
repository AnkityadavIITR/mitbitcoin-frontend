"use client";
import React, { useState } from "react";
import GlobalFeed from "@/components/globalFeed";
import PostButton from "@/components/postButton";
import { NostrProvider } from "nostr-react";
import KeyEnterModal from "@/components/modal/keyEnterModal";
import PersonalFeed from "@/components/personfeed";

const relayUrls = [
  "wss://relay.damus.io",
  "wss://relay.snort.social",
  "wss://nostr-pub.wellorder.net",
  "wss://relay.nostr.ch",
  "wss://nostr.jcloud.es",
];
const Nostr = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <NostrProvider relayUrls={relayUrls} debug={true}>
      <div className="mt-[100px]">
        <div className="px-10">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-500 text-white py-2 px-4 container w-[300px] rounded-lg mx-auto"
          >
            Post a Message!
          </button>
        </div>
        <GlobalFeed />

        <PersonalFeed/>
        
        {showUploadModal && (
          <KeyEnterModal
            showUploadModal={showUploadModal}
            setShowUploadModal={setShowUploadModal}
          />
        )}
      </div>
    </NostrProvider>
  );
};

export default Nostr;
