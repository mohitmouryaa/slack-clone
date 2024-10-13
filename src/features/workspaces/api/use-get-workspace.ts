import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspaceProps {
  id: Id<"workspaces">;
}

export default function useGetWorkspace({ id }: useGetWorkspaceProps) {
  const workspace = useQuery(api.workspaces.getById, { id });
  const isLoading = workspace === undefined;

  return { workspace, isLoading };
}
