import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSessionValue,
  verifyAdminAccessKey
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const action = String(formData.get("action") ?? "");
  const response = NextResponse.redirect(
    new URL(action === "logout" ? "/" : "/admin", request.url),
    303
  );

  if (action === "logout") {
    response.cookies.set(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/"
    });
    return response;
  }

  const accessKey = String(formData.get("accessKey") ?? "");
  if (!verifyAdminAccessKey(accessKey)) {
    return NextResponse.redirect(new URL("/admin-login?error=1", request.url), 303);
  }

  response.cookies.set(ADMIN_COOKIE_NAME, getAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });

  return response;
}
