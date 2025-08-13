import mongoose, { Schema } from "mongoose";
import { IJobSeeker } from "./jobseeker.interface";

const JobSeekerSchema: Schema<IJobSeeker> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    // Personal Information
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, required: false },        // optional
    photoUrl: { type: String, required: false },                  // optional

    // Professional Information
    resumeUrl: { type: String, required: false },                 // optional
    skills: [{ type: String, trim: true, required: false }],      // optional
    certifications: [{ type: String, trim: true, required: false }],  // optional
    experience: [
      {
        title: { type: String, trim: true, required: false },     // optional
        company: { type: String, trim: true, required: false },   // optional
        startDate: { type: Date, required: false },                // optional
        endDate: { type: Date, required: false },                  // optional
        description: { type: String, trim: true, required: false } // optional
      }
    ],
    education: [
      {
        degree: { type: String, trim: true, required: false },     // optional
        institution: { type: String, trim: true, required: false },// optional
        startYear: { type: Number, required: false },              // optional
        endYear: { type: Number, required: false }                 // optional
      }
    ],
    // Social Links
    socialLinks: {
      linkedin: { type: String, trim: true, required: false },
      twitter: { type: String, trim: true, required: false },
      facebook: { type: String, trim: true, required: false },
      instagram: { type: String, trim: true, required: false },
      website: { type: String, trim: true, required: false },
    },

    // Preferences for Jobs
    preferences: {
      jobTypes: [{ type: String, trim: true, required: false }],  // optional
      locations: [{ type: String, trim: true, required: false }], // optional
      industries: [{ type: String, trim: true, required: false }],// optional
      expectedSalary: {
        min: { type: Number, required: false },                   // optional
        max: { type: Number, required: false },                   // optional
        currency: { type: String, default: "USD", required: false }
      }
    },

    // Activity Tracking
    profileViews: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const JobSeeker = mongoose.model<IJobSeeker>("JobSeeker", JobSeekerSchema);
