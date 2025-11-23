import Header from "../../components/header";
import StatsLinkBox from "../../client/StatsLinkBox";
import CopyButton from "./CopyButton";
import { db } from "@/app/db/db";
import { links } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export default async function StatsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  // Fetch direcly from database
  const rows = await db.select().from(links).where(eq(links.code, code)).limit(1);

  if (!rows || rows.length === 0) {
    return <h1 className="p-6 text-center text-2xl">404 — Link not found</h1>;
  }

  const data = rows[0];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Header />

      <h1 className="text-3xl font-bold">Stats for <span className="font-mono">{code}</span></h1>

      <div className="space-y-2 text-lg">
        <p><strong>Original URL:</strong> {data.url}</p>
        <p><strong>Total Clicks:</strong> {data.clicks}</p>
        <p><strong>Last Clicked:</strong> {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : "Never"}</p>
      </div>

      <StatsLinkBox code={code} />

      <a href="/" className="text-blue-600 underline">
        ⬅ Back to Dashboard
      </a>
    </div>
  );
}
