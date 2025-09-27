import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Generate a secure nonce (at least 8 alphanumeric characters)
    const nonce = crypto.randomUUID().replace(/-/g, "");
    
    // Store the nonce in a secure cookie to prevent tampering
    const cookieStore = await cookies();
    cookieStore.set("siwe-nonce", nonce, { 
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 10 // 10 minutes
    });
    
    return NextResponse.json({ nonce });
  } catch (error) {
    console.error("Error generating nonce:", error);
    return NextResponse.json(
      { error: "Failed to generate nonce" }, 
      { status: 500 }
    );
  }
}
