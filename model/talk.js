import { Schema, model, models } from "mongoose";

const TalkSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  talk: {
    type: String,
    required: [true, "Topic name is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
  likes: {
    type: String,
    required: [true, "Tag is required!"],
  },
  dislikes: {
    type: String,
    required: [true, "Tag is required!"],
  },
});
const Talk = models.Talk || model("Talk", TalkSchema);

export default Talk;
