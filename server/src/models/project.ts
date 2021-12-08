import { IProject } from "./../types/project";
import { model, Schema } from "mongoose";

const projectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IProject>("Project", projectSchema);
