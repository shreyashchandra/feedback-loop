import mongoose, {Document, Schema} from "mongoose";
import { Message, MessageSchema } from "./Message.model";

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

export const UserSchema: Schema<User> = new Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    verifyCode: {
        type: String,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        required: true
    },
    messages: [MessageSchema]
})

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema));