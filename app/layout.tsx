import { QueryProvider } from "@/components/common/QueryClientProvider";
import { AuthProvider } from "@/components/hooks/useAuth";
import LayoutShell from "@/components/layout/LayoutShell";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dream Vision International",
  description: "Trusted Medical Equipment for Modern Healthcare",
  // icons: {
  //   icon: [
  //     { url: "/public/image/logo-png.png", sizes: "any", type: "image/png" },
  //   ],
  //   shortcut: "/public/image/logo-png.png",
  //   apple: "/public/image/logo-png.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <QueryProvider>
            <LayoutShell>{children}</LayoutShell>
          </QueryProvider>
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
