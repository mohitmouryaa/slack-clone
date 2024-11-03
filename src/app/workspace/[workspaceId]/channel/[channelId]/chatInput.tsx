import dynamic from "next/dynamic";
import type Quill from "quill";
import { useRef } from "react";

interface ChatInputProps {
  placeholder: string;
}

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function ChatInput({ placeholder }: ChatInputProps) {
  const ediorRef = useRef<Quill | null>(null);
  return (
    <div className="w-full px-5">
      <Editor
        placeholder={placeholder}
        onSubmit={() => console.log("Submitted")}
        disabled={false}
        innerRef={ediorRef}
      />
    </div>
  );
}
