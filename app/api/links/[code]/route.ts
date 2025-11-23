import { NextResponse } from "next/server";
import { db } from "@/app/db/db";
import { links } from "@/app/db/schema";
import { eq } from "drizzle-orm";

// GET  Stats
export async function GET(req: Request, props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params;
  const result = await db.select().from(links).where(eq(links.code, code));
  if (!result.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(result[0]);
}

// DELETE 
export async function DELETE(req: Request, props: { params: Promise<{ code: string }> }) {
  const { code } = await props.params;
  await db.delete(links).where(eq(links.code, code));
  return NextResponse.json({ ok: true });
}

