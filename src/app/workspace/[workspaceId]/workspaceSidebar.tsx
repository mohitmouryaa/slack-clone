import useCurrentMember from "@/features/members/api/use-current-member";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useGetMembers from "@/features/members/api/use-get-members";
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizontal } from "lucide-react";
import WorkspaceHeader from "./workspaceHeader";
import SidebarItem from "./Sidebar-item";
import useGetChannels from "@/features/channels/api/use-get-channels";
import WorkspaceSection from "./workspaceSection";
import UserItem from "./userItem";
import useCreateChannelModal from "@/features/channels/store/use-create-channel.modal";

export default function WorkspaceSidebar() {
  const workspaceId = useWorkspaceId();

  const [_open, setOpen] = useCreateChannelModal();

  const { currentMember, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
  const { channels } = useGetChannels({ workspaceId });
  const { members } = useGetMembers({ workspaceId });

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
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem label="Threads" icon={MessageSquareText} id="threads" variant={"default"} />
        <SidebarItem label="Drafts & Sent" icon={SendHorizontal} id="drafts" variant={"default"} />
      </div>

      <WorkspaceSection
        label="Channels"
        hint="New Channel"
        onNew={currentMember.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item, index) => (
          <SidebarItem key={index} icon={HashIcon} label={item.name} id={item._id} />
        ))}
      </WorkspaceSection>

      <WorkspaceSection label="Direct Messages" hint="New Direct Message" onNew={() => {}}>
        {members?.map((item) => (
          <UserItem key={item._id} id={item._id} label={item.user.name} image={item.user.image} />
        ))}
      </WorkspaceSection>
    </div>
  );
}
