import mongoose, {Document, Schema} from "mongoose";
import { Message } from "./Message.model";

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    isAcceptingMessage: {
        type: Boolean,
        required: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
})

export const UserModel = mongoose.model<User>("User", UserSchema);