"use client";

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();
  return (
    <div>
      LOGGED IN!
      <Button onClick={() => void signOut()}>Sign Out</Button>
    </div>
  );
}
