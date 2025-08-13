import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { RefreshToken } from "./user.RefreshTokenModel";


const UserSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    refreshTokens: { type: [RefreshToken], default: [] }, 
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);