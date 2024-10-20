import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserItemProps {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
}

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function UserItem({ id, label = "Member", image, variant }: UserItemProps) {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label[0].toUpperCase();
  return (
    <Button
      variant={"transparent"}
      className={cn(
        userItemVariants({
          variant,
        })
      )}
      size={"sm"}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="mr-1 rounded-md size-5">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="text-xs text-white rounded-md bg-sky-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
}
