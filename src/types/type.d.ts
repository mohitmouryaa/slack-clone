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
