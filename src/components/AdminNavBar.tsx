"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminNavBar() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  if (status === "loading") return <div />;

  if (session && session.user) {
    return (
      <nav className="flex items-center justify-between p-2">
        <div className="p-2 text-accentBlue">
          <Link
            href="/admin/analytics"
            className={`p-2 ${
              pathname?.includes("analytics") ? " underline" : ""
            }`}
          >
            Analytics
          </Link>
          <Link
            href="/admin/questions"
            className={`p-2 ${
              pathname?.includes("questions") ? "underline" : ""
            }`}
          >
            Questions
          </Link>
        </div>
        <div className="flex items-center p-2">
          <p className="mr-2 text-accentBlue">
            Signed in as {session.user.email}
          </p>
          <button
            className="p-2 font-bold text-white rounded-lg hover:brightness-95 bg-accentOrange"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </nav>
    );
  }
  return (
    <>
      Not signed in <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg"
      />
      <button
        onClick={() => signIn("email", { redirect: true, email })}
        className="p-2 m-1 rounded-lg bg-accentOrange"
      >
        Sign in
      </button>
    </>
  );
}
