"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session && session.user) {
    router.replace("/admin/analytics");
  }
  return <div />;
};

export default AdminPage;
