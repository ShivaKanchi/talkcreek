import { connectDB } from "@utils/database";
// import USer from "@model/user";

export const POST = async (req) => {
  const { username, email, password } = await req.json();
  try {
    await connectDB();
    const newUser = new USer({
      creator: userId,
      username,
      tag,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create Topic", { status: 500 });
  }
};
