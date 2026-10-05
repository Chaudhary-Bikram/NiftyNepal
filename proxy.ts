import { NextResponse, type NextRequest } from "next/server";
export function proxy(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p.startsWith("/en") || p.startsWith("/ne")) return NextResponse.next();
  return NextResponse.redirect(new URL("/en" + (p === "/" ? "" : p), req.url), 301);
}
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
