"use client";

import UserButton from "@/features/auth/components/user-button";
import useCreateWorkspaceModal from "@/features/workspaces/store/use-create-workspace-modal";
import useGetWorkspaces from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { workspaces, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen, router]);
  return (
    <div>
      <UserButton />
    </div>
  );
}
