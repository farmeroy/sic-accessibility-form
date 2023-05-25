"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  router.push("quiz/physical");
  // return <App />;
}
