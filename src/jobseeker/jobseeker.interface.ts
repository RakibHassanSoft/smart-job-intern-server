import { Document, Types } from "mongoose";

export interface IJobSeeker extends Document {
  userId: Types.ObjectId;

  // Personal Information
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;

  // Professional Information
  resumeUrl?: string;
  skills?: string[];
  certifications?: string[];

  experience?: {
    title?: string;
    company?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
  }[];

  education?: {
    degree?: string;
    institution?: string;
    startYear?: number;
    endYear?: number;
  }[];
  
  socialLinks?: {
    linkedin?: { type: String; trim: true };
    twitter?: { type: String; trim: true };
    facebook?: { type: String; trim: true };
    instagram?: { type: String; trim: true };
    website?: { type: String; trim: true };
  };

  // Preferences for Jobs
  preferences?: {
    jobTypes?: string[];
    locations?: string[];
    industries?: string[];
    expectedSalary?: {
      min?: number;
      max?: number;
      currency?: string;
    };
  };

  // Activity Tracking
  profileViews?: number;
  lastUpdated?: Date;

  // Mongoose timestamps
  createdAt: Date;
  updatedAt: Date;
}
