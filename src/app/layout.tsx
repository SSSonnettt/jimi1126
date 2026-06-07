import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { NavBar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "highlight.js/styles/github.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Sonnet", template: "%s | Sonnet" },
  description: "AI 应用构建者",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
