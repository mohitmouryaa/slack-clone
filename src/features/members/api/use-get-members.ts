import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function useGetMembers({ workspaceId }: UseGetMemberProps) {
  const members = useQuery(api.members.get, { workspaceId });
  const isLoading = members === null;

  return { members, isLoading };
}
