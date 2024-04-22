"use client"
import React, { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';

const GlobalFeed = () => {
  const now = useRef(new Date());

  const { events } = useNostrEvents({
    filter: {
      since: dateToUnix(now.current),
      kinds: [1], // text_note
    },
  });

  return (
    <div className='max-w-[90%] mx-auto'>
      <h2 className="text-xl font-bold mt-4">Global Feed</h2>
      {events.map((event) => (
        <p key={event.id}>
          {event.pubkey} posted: {event.content}
        </p>
      ))}
    </div>
  );
};

export default GlobalFeed;
