import { connectDB } from "@utils/database";
import bcrypt from "bcryptjs";
import User from "@model/user";

export const POST = async (req) => {
  const { username, password } = await req.json();
  try {
    await connectDB();
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password,
    });
    // console.log(email, "\n", username, "\n", password, "\n", hashedPassword);
    // await newUser.save(newUser);
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create Topic", { status: 500 });
  }
};
