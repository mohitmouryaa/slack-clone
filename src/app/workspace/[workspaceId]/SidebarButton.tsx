import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}

export default function SidebarButton({ icon: Icon, label, isActive }: SidebarButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant={"transparent"}
        className={cn("size-9 p-2 group-hover:bg-accent/20", {
          "bg-accent/10": isActive,
        })}
      >
        <Icon className="text-white transition-all size-5 group-hover:scale-110" />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent">{label}</span>
    </div>
  );
}
