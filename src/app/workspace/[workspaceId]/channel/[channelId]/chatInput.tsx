import useCreateMessage from "@/features/messages/api/use-create-message";
import useChannelId from "@/hooks/use-channel-id";
import useWorkspaceId from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import type Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ChatInputProps {
  placeholder: string;
}

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function ChatInput({ placeholder }: ChatInputProps) {
  const [editorKey, setEditorKey] = useState<number>(0);
  const [isPending, setIsPending] = useState<boolean>(false);
  const ediorRef = useRef<Quill | null>(null);
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true);
      await createMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        {
          throwError: true,
        }
      );
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full px-5">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={ediorRef}
      />
    </div>
  );
}
