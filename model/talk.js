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
  },
  dislikes: {
    type: String,
  },
});
const Talk = models.Talk || model("Talk", TalkSchema);

export default Talk;
