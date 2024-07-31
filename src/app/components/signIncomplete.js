//app/components/signInComplete.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "../_utils/auth-context";

export default function FinishSignIn() {
  const [message, setMessage] = useState("");
  const { completePasswordlessSignIn } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    const email = window.localStorage.getItem("emailForSignIn");
    if (email && window.location.href) {
      completePasswordlessSignIn(email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setMessage("Successfully signed in!");
          router.push("/"); // Redirect to home page 
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }, [completePasswordlessSignIn, router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Finish Sign In</h1>
      {message && <p>{message}</p>}
    </div>
  );
}
