"use client";
// import App from "../src/App";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  router.push("quiz");
  // return <App />;
}
