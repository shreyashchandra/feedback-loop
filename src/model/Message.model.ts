import mongoose, {Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: mongoose.Schema<Message> = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const MessageModel = mongoose.model<Message>("Message", MessageSchema);