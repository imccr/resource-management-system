import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Resource Management System",
  description: "Manage your resources efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
//hello