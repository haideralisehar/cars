import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const backendRes = await fetch(
    "https://carsappapis20260306224811-h5abbce0g9fjajhz.canadacentral-01.azurewebsites.net/api/Auth/refresh",
    {
      method: "POST",
      credentials: "include",
      headers: {
      Cookie: `refreshToken=${refreshToken}`,
}
    }
  );
  //aswqwdwd
//uwijohdwef
  if (!backendRes.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await backendRes.json();
  
  const res = NextResponse.json({ success: true });

  res.cookies.set("token", data.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 14 * 24 * 60 * 60,
  });

  return res;
}
