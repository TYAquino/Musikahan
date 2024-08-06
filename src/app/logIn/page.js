"use client";

import React from "react";
import SignIn from "../components/signIn";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/picture1.png"
            width={100}
            height={100}
            alt="logo"
            className="mb-4"
          />
          <h2 className="text-xl font-bold mb-2 text-center bg-">
            Listen to the Heart Bit of Filipino Music
          </h2>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
