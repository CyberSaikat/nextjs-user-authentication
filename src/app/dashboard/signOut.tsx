"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div className="">
      <button
        type="button"
        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-300"
        onClick={() => {
          signOut({
            callbackUrl: "/login",
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}
