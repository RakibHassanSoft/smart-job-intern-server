import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "./user.interface";

const RefreshTokenModel: Schema<IRefreshToken> = new Schema(
  {
    token: { type: String, required: true },
    device: { type: String },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { _id: false }
);

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenModel);
