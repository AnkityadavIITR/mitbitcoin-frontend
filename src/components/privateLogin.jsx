import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { generateSecretKey, getPublicKey } from "nostr-tools";
import { bytesToHex } from "@noble/hashes/utils";
import usePublish from "@/hooks/usePublish";
import { useAuth } from "@/context/useAuth";
import { usePool } from "@/context/usePool";

export default function PrivateLogin() {
  const { user, publicKey, loginWithPrivateKey, logout, setIntialState } =
    useAuth();
  const publish = usePublish();
  const [privateKey, setPrivateKey] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("publish: ", publicKey);

  const handlePrivateKeyInput = useCallback((event) => {
    setPrivateKey(event.target.value);
  }, []);

  const handleDisplayNameInput = useCallback((event) => {
    setDisplayName(event.target.value);
  }, []);

  const handleGenerateButton = useCallback(() => {
    try {
      const sk = generateSecretKey();
      const privateKey = bytesToHex(sk);
      setIsNewUser(true);
      setPrivateKey(privateKey);
    } catch (error) {
      console.error("Error generating private key:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  }, []);

  const handleLoginWithPrivateKey = useCallback(async () => {
    if (!privateKey) return;

    // setIsLoading(true);

    if (isNewUser) {
      const event = await publish({ kind: 0 });
      console.log("event", event);
    //   if (!event) return;
    }

    loginWithPrivateKey(privateKey);
  }, [loginWithPrivateKey, privateKey, isNewUser, publish]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">With Keys</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-uato">
        <DialogHeader>
          <DialogTitle>Login with Private key</DialogTitle>
          <DialogDescription>Enter your private key to login</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Private key
            </Label>
            <Input
              id="name"
              defaultValue="Private key goes here"
              className="col-span-3"
              value={privateKey}
              onChange={handlePrivateKeyInput}
            />
          </div>
        </div>
        {isNewUser && (
          <div className="">
            <div className=" items-center gap-4">
              <Label htmlFor="name" className="text-right">
                What do you want to be called on Nostr?
              </Label>
              <Input
                id="name"
                defaultValue="Private key goes here"
                placeholder="display name"
                className="col-span-3"
                value={displayName}
                onChange={handleDisplayNameInput}
              />
            </div>
            <p className="mt-6 mb-2 text-warning">
              <strong>Warning:</strong> Do not share your private key with
              anyone. It is important that you keep it safe. It is the only way
              to access your account. If you lose it, you will lose access to
              your account.
            </p>
          </div>
        )}
        {!isNewUser && (
          <>
            <DialogHeader className="mt-8">
              <DialogTitle>Don&apos;t you have a private key?</DialogTitle>
              <DialogDescription>
                Create your own pair of private and public keys
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 ">
              <Button onClick={handleGenerateButton} type="submit">
                Generate Private keys
              </Button>
            </div>
          </>
        )}

        <DialogFooter>
          <Button type="submit" onClick={handleLoginWithPrivateKey}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
