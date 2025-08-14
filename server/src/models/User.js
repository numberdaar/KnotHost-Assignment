import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: true },
  resetToken: { type: String },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', userSchema)


