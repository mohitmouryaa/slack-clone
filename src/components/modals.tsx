"use client";

import CreateChannelModal from "@/features/channels/components/createChannelModal";
import CreateWorkspaceModal from "@/features/workspaces/components/createWorkspaceModal";
import { useEffect, useState } from "react";

export default function Modals() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
}
