import { NextResponse } from "next/server";

export async function POST() {
    console.log("hello from th route ");

    return NextResponse.json({ success: true })
}