import { Button } from "@/components/ui/button";
import useGetWorkspace from "@/features/workspaces/api/use-get-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { InfoIcon, SearchIcon } from "lucide-react";

export default function Toolbar() {
  const workspaceId = useWorkspaceId();

  const { workspace } = useGetWorkspace({ id: workspaceId });
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1"/>
        <div className="min-w-[280px] max-[642px] grow-[2] shrink">
          <Button size={"sm"} className="justify-start w-full px-2 bg-accent/25 hover:bg-accent-25 h-7">
            <SearchIcon className="mr-2 text-white size-4" />
            <span className="text-xs text-white">Search {workspace?.name}</span>
          </Button>
        </div>
      <div className="flex items-center justify-end flex-1 ml-auto">
        <Button variant={"transparent"} size={"iconSm"}>
          <InfoIcon className="text-white size-5" />
        </Button>
      </div>
    </nav>
  );
}
