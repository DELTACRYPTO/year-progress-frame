"use client";

import dynamic from "next/dynamic";

const YearProgress = dynamic(() => import("@/components/YearProgress"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <YearProgress />
    </main>
  );
}
