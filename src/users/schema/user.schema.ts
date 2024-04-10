import mongoose, { Document, Schema, model, Types } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    userRole: 'Author' | 'Admin' | 'Retail Users';
}
export const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true, enum: ['Author', 'Admin', 'Retail Users'] }
});


export const UserModel = mongoose.model<IUser>('User', UserSchema);