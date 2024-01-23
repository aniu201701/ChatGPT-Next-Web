/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSideConfig } from "./config/server";
import { GoogleTagManager } from "@next/third-parties/google";
const serverConfig = getServerSideConfig();

export const metadata: Metadata = {
  title: "AI Chat Bot",
  description: "Your personal ChatGPT Chat Bot.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
  appleWebApp: {
    title: "AI Chat Bot",
    statusBarStyle: "default",
  },
};

// 20% of the time, enable meticulous
const isEnableMeticulous =
  process.env.NODE_ENV !== "production" || Math.random() < 0.2;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const MeticulousScript = isEnableMeticulous ? (
    <script
      data-project-id="hcpL0HiNYUgo4WVdtXUXNWTqQyCFWV9O4Ps1CSxw"
      src="https://snippet.meticulous.ai/v1/meticulous.js"
    />
  ) : null;
  return (
    <html lang="en">
      <head>
        {MeticulousScript}
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        {children}
        {serverConfig?.isVercel && (
          <>
            <SpeedInsights />
          </>
        )}
        {serverConfig?.gtmId && (
          <>
            <GoogleTagManager gtmId={serverConfig.gtmId} />
          </>
        )}
      </body>
    </html>
  );
}
