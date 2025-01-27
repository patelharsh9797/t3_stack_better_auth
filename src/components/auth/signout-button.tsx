"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingButton from "~/components/loading-button";
import { authClient } from "~/server/auth/client";

export default function SignoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin");
            // router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <LoadingButton
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      pending={pending}
      onClick={handleSignOut}
    >
      Sign Out
    </LoadingButton>
  );
}
