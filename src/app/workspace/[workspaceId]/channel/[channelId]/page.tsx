"use client";

import useGetChannel from "@/features/channels/api/use-get-channel";
import useChannelId from "@/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import Header from "./header";
import ChatInput from "./chatInput";
import useGetMessages from "@/features/messages/api/use-get-messages";
import MessageList from "@/components/message-list";

export default function ChannelIdPage() {
  const channelId = useChannelId();
  const { results, status, loadMore } = useGetMessages({ channelId });
  const { channel, isLoading: channelLoading } = useGetChannel({ channelId });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full gap-y-2">
        <TriangleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message #${channel.name}`} />
    </div>
  );
}
