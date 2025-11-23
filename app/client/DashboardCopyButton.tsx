"use client";
import { useState } from "react";

export default function DashboardCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const link = `${origin}/${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  return (
    <button
      onClick={handleCopy}
      className={`underline transition cursor-pointer ${
        copied ? "text-green-600 font-bold" : "text-gray-700"
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

