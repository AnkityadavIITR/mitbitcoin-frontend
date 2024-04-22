"use client"
import React from 'react'
import { useNostrEvents } from "nostr-react";

const PersonalFeed = () => {
    const { events } = useNostrEvents({
        filter: {
          authors: [
            "75a71121ae1d67a6fbbd4013077e05ae7e8fbeff9e644d97220ed7bd074cbb69",
          ],
          since: 0,
          kinds: [1],
        }
      });
      console.log(events);
  return (
    <div>
      {events.map((event) => (
        <p key={event.id}>{event.pubkey} posted: {event.content}</p>
      ))}
    </div>
  )
}

export default PersonalFeed;
