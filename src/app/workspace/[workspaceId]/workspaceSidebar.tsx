import useCurrentMember from "@/features/members/api/use-current-member";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspaceHeader";

export default function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const { currentMember, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="text-white size-5 animate-spin" />
      </div>
    );
  }

  if (!workspace || !currentMember) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="text-white size-5" />
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={currentMember.role === "admin"} />
    </div>
  );
}
