"use client";
import { useContext, useEffect } from "react";
import { PageContext } from "../src/lib/QuizContext";

import { useRouter } from "next/navigation";

export default function Page() {
  const page = useContext(PageContext);

  useEffect(() => {
    const storedPage = localStorage.getItem("SICPage")
      ? JSON.parse(localStorage.getItem("SICPage")).page
      : null;
    if (storedPage !== null) {
      page.page = storedPage;
    } else {
      localStorage.setItem("SICPage", JSON.stringify({ page: "physical" }));
    }
  });
  const router = useRouter();
  router.push(`quiz/${page.page}`);
  return <div />;
}
