import { connectDB } from "@utils/database";
import bcrypt from "bcryptjs";
import User from "@model/user";

export const POST = async (req) => {
  const { username, email, password, image } = await req.json();
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image: image
        ? image
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });
    console.log(email, "\n", username, "\n", password, "\n", hashedPassword);
    await newUser.save(newUser);
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create Topic", { status: 500 });
  }
};
