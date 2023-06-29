"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
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
      <button onClick={() => signIn("email", { redirect: false, email })}>
        Sign in
      </button>
    </>
  );
}
