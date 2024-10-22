import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    address: string;
    contact: string;
    category: string;
    otherTalent?: string; // Optional field
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    otherTalent: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
