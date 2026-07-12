import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./app/lib/auth";

const ADMIN_EMAIL = "mdmosabbirrahman07@gmail.com";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const { pathname } = request.nextUrl;

  // Not logged in
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/dashboard/admin") &&
    user.email !== ADMIN_EMAIL
  ) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/",
    "/dashboard/customer/",
  ],
};