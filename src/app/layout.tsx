import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/nextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

// Get the base URL dynamically from environment variables
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "User Management App | Manage Your Users Effectively",
  description: "A powerful user management app that helps you manage user roles, permissions, and profiles with ease.",
  openGraph: {
    title: "User Management App | Manage Your Users Effectively",
    description: "Effortlessly manage users, assign roles, and control permissions in your organization with our user management app.",
    url: baseUrl, // Dynamic URL based on environment
    type: "website",
    siteName: "User Management App",
    images: [
      {
        url: `${baseUrl}/images/og-image.png`, // Dynamic image URL
        width: 1200,
        height: 630,
        alt: "User Management App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourAppTwitterHandle",
    title: "User Management App | Manage Your Users Effectively",
    description: "Simplify user management with easy-to-use tools for assigning roles, permissions, and handling profiles.",
    images: [
      {
        url: `${baseUrl}/images/twitter-card.png`, // Dynamic image URL
        alt: "User Management App",
      },
    ],
  },
  keywords: ["User Management", "Roles and Permissions", "User Profiles", "Admin Dashboard", "User Access Control"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
