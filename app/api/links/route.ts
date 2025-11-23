import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { links } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm";


// POST - Create new short link
export async function POST(req: Request) {
  const { url, code } = await req.json();

  if (!url || !code) {
    return NextResponse.json({ error: "URL and code are required" }, { status: 400 });
  }

  if (!/^[A-Za-z0-9]{3,5}$/.test(code)) {
  return NextResponse.json(
    { error: "Code must be 3–5 characters (letters or numbers only)" },
    { status: 400 }
  );
}

  try {
  new URL(url);
} catch {
  return NextResponse.json(
    { error: "Invalid URL format" },
    { status: 400 }
  );
}

  const existing = await db.select().from(links).where(eq(links.code, code));

  if (existing.length > 0) {
    return NextResponse.json({ error: "Code already exists" }, { status: 409 });
  }

  await db.insert(links).values({ code, url });

  return NextResponse.json({ ok: true });
}

// GET - List all links
export async function GET() {
  const result = await db.select().from(links).orderBy(desc(links.lastClicked));
  return NextResponse.json(result);
}

