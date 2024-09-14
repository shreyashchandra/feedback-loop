import mongoose, {Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date;
}

export const MessageSchema: mongoose.Schema<Message> = new mongoose.Schema({
    content : {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>("Message", MessageSchema));

