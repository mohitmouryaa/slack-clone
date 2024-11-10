declare type SignInFlow = "signIn" | "signUp";

declare interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

declare interface UseCurrentMemberProps {
  workspaceId: Id<"workspaces">;
}

declare interface UseGetMemberProps {
  workspaceId: Id<"workspaces">;
}

declare interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

declare interface HintProps {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

declare interface UpdateWorkspaceRequestType {
  id: Id<"workspaces">;
  name: string;
}

declare type MessageProps = {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updateTime"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
};

declare interface ChannelHeroProps {
  name: string;
  creationTime: number;
}
