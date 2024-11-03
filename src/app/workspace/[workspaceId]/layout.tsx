"use client";

import { ReactNode } from "react";
import Toolbar from "./toolbar";
import Sidebar from "./sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import WorkspaceSidebar from "./workspaceSidebar";

interface WorkspaceIdLayoutProps {
  children: ReactNode;
}

export default function WorkspaceIdLayout({ children }: WorkspaceIdLayoutProps) {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)] ">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId={"mm-workspace-layout"}>
          <ResizablePanel defaultSize={20} minSize={11} className="bg-[#5E2C5F]">
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={20}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
