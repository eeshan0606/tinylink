"use client";
import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
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
      className={`bg-gray-700 text-white px-3 py-2 rounded transition cursor-pointer ${
        copied ? "bg-green-600" : ""
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

