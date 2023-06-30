"use client";
import { useRouter } from "next/navigation";

const UnauthorizedRedirect = () => {
  const router = useRouter();
  router.replace("/admin");

  return <div />;
};

export default UnauthorizedRedirect;
