import dynamic from "next/dynamic";
import { format, isToday, isYesterday } from "date-fns";
import Hint from "./hint";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Thumbnail from "./thumbnail";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
};

export default function Message({
  id,
  isAuthor,
  memberId,
  authorImage,
  authorName = "Member",
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadTimestamp,
}: MessageProps) {
  if (isCompact) {
    return (
      <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
        <div className="flex items-start gap-2">
          <Hint label={formatFullTime(new Date(createdAt))}>
            <button className="text-xs opacity-0 text-muted-foreground group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
              {format(new Date(createdAt), "hh:mm")}
            </button>
          </Hint>
          <div className="flex flex-col w-full">
            <Renderer value={body} />
            <Thumbnail url={image} />
            {updatedAt ? <span className="text-xs text-muted-foreground">(edited)</span> : null}
          </div>
        </div>
      </div>
    );
  }

  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
      <div className="flex items-center gap-2">
        <button>
          <Avatar>
            <AvatarImage src={authorImage} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </button>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="text-sm">
            <button onClick={() => {}} className="font-bold text-primary hover:underline">
              {authorName}
            </button>
            <span>&nbsp;&nbsp;</span>
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-xs text-muted-foreground hover:underline">
                {format(new Date(createdAt), "h:mm a")}
              </button>
            </Hint>
          </div>
          <Renderer value={body} />
          <Thumbnail url={image} />
          {updatedAt ? <span className="text-xs text-muted-foreground">(edited)</span> : null}
        </div>
      </div>
    </div>
  );
}
