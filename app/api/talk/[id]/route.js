import { connectDB } from "@utils/database";
import Talk from "@model/talk";
// GET(read)
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const talk = await Talk.findById(params.id).populate("creator");
    if (!talk) {
      return new Response(`Failed to get Topic with id ${params.id}`, {
        status: 404,
      });
    }

    return new Response(JSON.stringify(talk), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to get Topics", { status: 500 });
  }
};

// PATCH(update)
export const PATCH = async (req, { params }) => {
  const { talk, tag } = await req.json();
  try {
    await connectDB();
    const existingTalk = await Talk.findById(params.id);
    if (!existingTalk) {
      return new Response(`Failed to update  Topic with id ${params.id}`, {
        status: 404,
      });
    }
    existingTalk.talk = talk;
    existingTalk.tag = tag;
    await existingTalk.save();
    return new Response(JSON.stringify(existingTalk), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update the topicc", { status: 500 });
  }
};
// DELETE(...)
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const existingTalk = await Talk.findByIdAndDelete(params.id);
    if (!existingTalk) {
      return new Response(`Failed to delete Topic with id ${params.id}`, {
        status: 404,
      });
    }
    return new Response("Topic deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete the topicc", { status: 500 });
  }
};
