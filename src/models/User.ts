import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  encryptPassword: (password:string) => Promise<string>;
}

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    min: 4,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default model<IUser>("User", userSchema);
