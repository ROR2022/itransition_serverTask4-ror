import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ timestamps: true })
export class Participant {
  @Prop({ required: true })
  nickname: string;

  @Prop()
  avatar: string;

  @Prop()
  online: boolean;

  @Prop({ type: [String] })
  hideConversations: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

ParticipantSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
