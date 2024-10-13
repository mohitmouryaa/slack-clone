"use client";

import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/useWorkspaceId";

export default function WorkspaceIdPage() {
  const workspaceId = useWorkspaceId();
  const { workspace } = useGetWorkspace({ id: workspaceId });
  return <div>{JSON.stringify(workspace)}</div>;
}
