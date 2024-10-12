import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/convex-client-provider";

import "./globals.css";
import CreateWorkspaceModal from "@/features/workspaces/components/createWorkspaceModal";
import Modals from "@/components/modals";
import { Toaster } from "sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slack",
  description: "a Slack clone app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ConvexClientProvider>
            <Toaster />
            <Modals />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
