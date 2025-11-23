// import { db } from "@/app/db/db";
// import { links } from "@/app/db/schema";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

// export default async function CodeRedirect(props: { params: Promise<{ code: string }> }) {
//   const { code } = await props.params; 

//   const result = await db.select().from(links).where(eq(links.code, code));

//   if (!result.length) {
//     return <h1 style={{ padding: 40 }}>404 — Link not found</h1>;
//   }

//   await db.update(links)
//     .set({
//       clicks: result[0]!.clicks + 1,
//       lastClicked: new Date()
//     })
//     .where(eq(links.code, code));

//   redirect(result[0].url);
// }

import { db } from "@/app/db/db";
import { links } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function CodeRedirect({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const result = await db.select().from(links).where(eq(links.code, code)).limit(1);

  if (!result || result.length === 0) {
    return redirect("/");
  }

  const row = result[0];

  await db
    .update(links)
    .set({
      clicks: (row.clicks ?? 0) + 1,      
      lastClicked: new Date(),
    })
    .where(eq(links.code, code));

  redirect(row.url);
}


