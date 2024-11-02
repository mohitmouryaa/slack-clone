"use client";

import useGetChannels from "@/features/channels/api/use-get-channels";
import useCreateChannelModal from "@/features/channels/store/use-create-channel-modal";
import useCurrentMember from "@/features/members/api/use-current-member";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function WorkspaceIdPage() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();
  const { currentMember, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => currentMember?.role === "admin", [currentMember?.role]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !currentMember || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    workspace,
    currentMember,
    workspaceLoading,
    channelsLoading,
    memberLoading,
    workspaceId,
    channelId,
    open,
    isAdmin,
    setOpen,
    router,
  ]);

  if (workspaceLoading || channelsLoading)
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (!workspace) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Workspace not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No channel found</span>
    </div>
  );
}
