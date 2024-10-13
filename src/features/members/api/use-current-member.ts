import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function useCurrentMember({ workspaceId }: UseCurrentMemberProps) {
  const currentMember = useQuery(api.members.current, { workspaceId });
  const isLoading = currentMember === null;

  return { currentMember, isLoading };
}
