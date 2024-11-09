import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useGetWorkspaces from "@/features/workspaces/api/use-get-workspaces";
import useCreateWorkspaceModal from "@/features/workspaces/store/use-create-workspace-modal";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Loader, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkspaceSwitcher() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { workspaces } = useGetWorkspaces();
  const { workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

  const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"iconSm"}
          className="size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl"
        >
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin hover:shrink-0" />
          ) : (
            workspace?.name?.charAt(0)?.toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="flex-col items-start justify-start capitalize cursor-pointer"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">Active Workspace</span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            className="overflow-hidden capitalize cursor-pointer"
            onClick={() => router.push(`/workspace/${workspace?._id}`)}
          >
            <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
              {workspace?.name?.charAt(0)?.toUpperCase()}
            </div>
            <p className="truncate">{workspace?.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <PlusIcon />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
