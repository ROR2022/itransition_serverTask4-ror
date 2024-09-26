import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  message: string;

  @Prop({ type: mongo.ObjectId, ref: 'Participant' })
  sender: string;

  @Prop({ type: mongo.ObjectId, ref: 'Participant' })
  reciver: string;

  @Prop({ type: mongo.ObjectId, ref: 'Conversation' })
  conversation: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
