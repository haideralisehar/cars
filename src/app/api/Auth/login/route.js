import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email or Password is required" },
                { status: 400 },
            );
        }

        const payload = {
            email: email,
            password: password,
        };

        const apiUrl = `https://cityinbookingapi20251018160614-fxgqdkc6d4hwgjf8.canadacentral-01.azurewebsites.net/api/Auth/login/verify-otp`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data?.message || "Login failed" },
                { status: response.status },
            );
        }

        const token = data.token;

        if (data.success) {

            // 🟩 Prepare response
            const res = NextResponse.json({
                success: data.success,
                token,
            });

            // Refresh token (copied from backend response)
            const setCookie = response.headers.get("set-cookie");
            if (setCookie?.includes("refreshToken")) {
                const refreshToken = setCookie
                    .split(";")
                    .find(c => c.includes("refreshToken"))
                    .split("=")[1];

                res.cookies.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 14 * 24 * 60 * 60

                });

            }

            //getting and storing the token in the cookies

            res.cookies.set("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                path: "/",
                maxAge: 14 * 24 * 60 * 60
            });



            console.log("success");
            return res;

        }


    } catch (error) {
        return NextResponse.json(
            { message: "Server error", error: error.message },
            { status: 500 },
        );
    }
}
