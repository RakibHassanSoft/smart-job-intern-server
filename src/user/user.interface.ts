// 1. Main User schema — auth info + refresh tokens with metadata
export interface IRefreshToken {
  token: string;
  device?: string;
  ip?: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  refreshTokens: IRefreshToken[];  // Array of token objects
  createdAt: Date;
  updatedAt: Date;
}