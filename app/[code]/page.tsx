import { db } from "@/app/db/db";
import { links } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function CodeRedirect(props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params; // ← correct for Next.js 14+

  const result = await db.select().from(links).where(eq(links.code, code));

  if (!result.length) {
    return <h1 style={{ padding: 40 }}>404 — Link not found</h1>;
  }

  await db.update(links)
    .set({
      clicks: result[0]!.clicks + 1,
      lastClicked: new Date()
    })
    .where(eq(links.code, code));

  redirect(result[0].url);
}

