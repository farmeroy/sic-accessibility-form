"use client";
import AdminNavBar from "@/components/AdminNavBar";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminNavBar />
      {children}
    </SessionProvider>
  );
}
