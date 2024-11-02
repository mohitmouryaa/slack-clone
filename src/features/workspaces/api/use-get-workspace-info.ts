import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspaceInfoProps {
  id: Id<"workspaces">;
}

export default function useGetWorkspaceInfo({ id }: useGetWorkspaceInfoProps) {
  const workspace = useQuery(api.workspaces.getInfoById, { workspaceId: id });
  const isLoading = workspace === undefined;

  return { workspace, isLoading };
}
