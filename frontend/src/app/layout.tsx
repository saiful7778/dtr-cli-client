import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { LayoutProps } from "@/types";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "DTR-CLI",
  description: "This is DTR-CLI frontend",
};

const RootLayout: React.FC<Readonly<LayoutProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body style={inter.style}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
