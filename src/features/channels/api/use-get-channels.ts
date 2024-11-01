import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelsProps {
  workspaceId: Id<"workspaces">;
}

export default function useGetChannels({ workspaceId }: UseGetChannelsProps) {
  const channels = useQuery(api.channels.get, { workspaceId });

  const isLoading = channels === undefined;

  return { channels, isLoading };
}

