import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelProps {
  channelId: Id<"channels">;
}

export default function useGetChannel({ channelId }: UseGetChannelProps) {
  const channel = useQuery(api.channels.getById, { id: channelId });

  const isLoading = channel === undefined;

  return { channel, isLoading };
}
