import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import "./globals.css";
import Modals from "@/components/modals";
import { Toaster } from "sonner";
import JotaiProvider from "@/components/jotai-provider";

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
            <JotaiProvider>
              <Toaster />
              <Modals />
              {children}
            </JotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
