"use client";

import useGetWorkspaceInfo from "@/features/workspaces/api/use-get-workspace-info";
import useJoinWorkspace from "@/features/workspaces/api/use-join-workspace";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Button } from "@/components/ui/button";
import { HashIcon, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMemo, useEffect } from "react";

export default function JoinPage() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { workspace, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const isMember = useMemo(() => workspace?.isMember, [workspace?.isMember]);
  const { mutate, isPending } = useJoinWorkspace();

  useEffect(() => {
    if (isMember) {
      router.push(`/workspace/${workspaceId}`);
    }
  }, [isMember, router, workspaceId]);

  const handleComplete = (value: string) => {
    mutate(
      { joinCode: value, workspaceId },
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success("Successfully joined workspace");
        },
        onError: () => {
          toast.error("Failed to join workspace");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-white rounded-lg shadow-md gap-y-8">
      <HashIcon className="text-pink-600 size-20 -rotate-12" />
      <div className="flex flex-col items-center justify-center max-w-md gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-2xl font-bold">Join {workspace?.name}</h1>
          <p className="text-md text-muted-foreground">Enter the workspace code to join</p>
        </div>
        <VerificationInput
          onComplete={handleComplete}
          length={6}
          classNames={{
            container: cn("flex gap-x-2", isPending && "opcacity-50 cursor-not-allowed"),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size={"lg"} variant={"outline"} asChild>
          <Link href={"/"}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
