import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export async function GET(req: Request) {
  try {
    const cookie = getCookie("ont_session", { req: req as any });
    if (!cookie) return NextResponse.json({ ok: false }, { status: 401 });
    let session = cookie;
    if (typeof session === "string") {
      try { session = JSON.parse(session); } catch (e) {}
    }
    return NextResponse.json({ ok: true, session });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
