import { connectDB } from "@utils/database";
import Talk from "@model/talk";
export const POST = async (req, res) => {
  const { userId, talk, tag } = await req.json();
  try {
    await connectDB();
    const newTalk = new Talk({
      creator: userId,
      talk: talk,
      tag: tag,
    });

    await newTalk.save();
    return new Response(JSON.stringify(newTalk), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create Topic", { status: 500 });
  }
};
