"use client";

import CopyButton from "./CopyButton";

export default function StatsLinkBox({ code }: { code: string }) {
  const fullShortUrl = `${window.location.origin}/${code}`;

  return (
    <div className="flex items-center gap-3">
      <input
        className="border px-3 py-2 w-full rounded"
        readOnly
        value={fullShortUrl}
        onClick={(e) => e.currentTarget.select()}
      />
      <CopyButton code={code} />
    </div>
  );
}
