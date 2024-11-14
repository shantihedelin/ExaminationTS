"use client";

import { useRouter } from "next/navigation";

export default function YouReceipt() {
  const router = useRouter();

  return (
    <main className="bg-[#605858] h-screen flex items-center justify-center flex-col">
      <div className="bg-white p-4">
        <div className="flex flex-col justify-center items-center">
          <img src="/logo.png" className="w-56 h-auto"></img>
          <h2>KVITTO</h2>
          <p>#333333</p>
        </div>
      </div>
      <button
        onClick={() => router.push("/")}
        className="absolute bottom-0 mb-6 w-full h-[78px] text-2xl rounded-md font-bold bg-[#363131] text-white border-none hover:cursor-pointer hover:bg-[#0f0d0d]"
      >
        GÖR EN NY BESTÄLLNING
      </button>
    </main>
  );
}
