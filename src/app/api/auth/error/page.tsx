"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  
  return <>
  <div className="w-screen h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200">
    <div className="w-[40rem] h-[20rem] bg-red-400 rounded-xl p-4 flex flex-col items-center justify-center gap-3">
        <h1 className="text-center text-4xl font-bold font-mono">Error</h1>
        <p className="text-center text-lg font-mono">
            {params.get("error")}
        </p>
    </div>
  </div>
  </>;
}
