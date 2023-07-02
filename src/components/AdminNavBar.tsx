"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function AdminNavBar() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");

  if (status === "loading") return <div />;

  if (session && session.user) {
    return (
      <nav className="flex p-2">
        <div className="p-2">
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <div className="p-2">
          <Link href="/admin/analytics">Analytics</Link>
          <Link href="/admin/questions">Questions</Link>
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
      />
      <button onClick={() => signIn("email", { redirect: true, email })}>
        Sign in
      </button>
    </>
  );
}
