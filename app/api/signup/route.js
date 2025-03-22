import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
  try {
    console.log("Signup API hit!");

    const { fullName, email, password, userType } = await request.json();

    // ✅ Input validation
    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ✅ Connect to DB
    await dbConnect();

    // ✅ Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // ✅ Create new user without hashing the password
    const newUser = await User.create({
      fullName,
      email,
      password, // Storing plain text password (⚠️ not recommended for production)
      userType,
    });

    // 🎉 Return success response
    return NextResponse.json(
      console.log("user created"),
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
