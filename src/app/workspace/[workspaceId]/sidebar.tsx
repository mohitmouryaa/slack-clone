import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./workspaceSwitcher";
import SidebarButton from "./SidebarButton";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
      <SidebarButton icon={MessagesSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />

      <div className="flex flex-col items-center justify-center mt-auto gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
}
