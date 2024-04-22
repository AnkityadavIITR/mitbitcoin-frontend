"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useWallet from "@/context/useWallet";
import { useAuth } from "@/context/useAuth";
import { Zap, Bitcoin, DiamondPlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PrivateLogin from "@/components/privateLogin";
import { Plus } from "lucide-react";
const Navbar = ({ type }) => {
  const [loading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { user, publicKey, privateKey, loginWithPublicKey, logout } = useAuth();

  const handleLoginWithExtension = async () => {
    if (typeof window !== "undefined") {
      setIsLoading(true);

      if (!window.nostr) return;

      const pubkey = await window.nostr.getPublicKey();

      if (pubkey) {
        loginWithPublicKey(pubkey);
      }
    }
  };

  useEffect(() => {
    if (!window.nostr) setShowLogin(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
      <div className="flex justify-between px-[80px] py-[15px] border-b container ">
        <Link className="" href={"/"}>
          <h1 className="font-secondary text-2xl text-customOrange font-semibold my-auto flex">
            Bitnote
            {type == "creator" ? <Plus strokeWidth={1.25} size={12} /> : ""}
          </h1>
        </Link>
        <div className="flex gap-x-4 my-auto ">
          <Bitcoin strokeWidth={1.8} size={28} />
          <Zap strokeWidth={1.8} size={28} className="text-customOrange" />
        </div>
        <div className="flex gap-4">
          {type !== "creator" && (
            <Link href={"/creator"} className="my-auto">
              <DiamondPlus
                strokeWidth={1.25}
                size={24}
                className="text-customOrange"
              />
            </Link>
          )}

          {showLogin ? (
            <PrivateLogin />
          ) : user && user.publicKey ? (
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                {user.publicKey?.length > 5
                  ? `${user.publicKey.slice(0, 5)}...`
                  : user.publicKey}
              </p>
            </div>
          ) : (
            <Button className="rounded-none bg-customOrange hover:scale-x-105 font-secondary hover:bg-customOrange hover:opacity-75">
              <Zap strokeWidth={1.25} size={20} className="mr-1" />
              <span onClick={handleLoginWithExtension}>Connect</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
