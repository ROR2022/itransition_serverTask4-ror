import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type PresentationDocument = HydratedDocument<Presentation>;

export interface UserInPresentation {
  nickname: string;
  role: string;
}

@Schema({ timestamps: true })
export class Presentation {
  @Prop({ required: true })
  author: string;

  @Prop()
  nickname: string;

  @Prop({ type: [{ nickname: String, role: String }] })
  users: UserInPresentation[];

  @Prop({ type: [mongo.ObjectId], ref: 'Slide' })
  slides: string[];

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PresentationSchema = SchemaFactory.createForClass(Presentation);

PresentationSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
