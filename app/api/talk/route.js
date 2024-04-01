import { connectDB } from "@utils/database";
import Talk from "@model/talk";
export const GET = async (req) => {
  try {
    await connectDB();
    const talks = await Talk.find({}).populate("creator");

    return new Response(JSON.stringify(talks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get Topics", { status: 500 });
  }
};
