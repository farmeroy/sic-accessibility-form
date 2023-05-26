"use client";
import { useContext, useEffect } from "react";
import { PageContext } from "../src/lib/QuizContext";

import { useRouter } from "next/navigation";

export default function Page() {
  const page = useContext(PageContext);
  useEffect(() => {
    localStorage.removeItem("SICQuiz");
  });

  const router = useRouter();
  router.push(`quiz/${page.page}`);
  return <div />;
}
