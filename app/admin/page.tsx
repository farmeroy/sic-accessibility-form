"use client";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  router.replace("/admin/analytics");
  return <div />;
};

export default AdminPage;
