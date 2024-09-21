import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type SlideDocument = HydratedDocument<Slide>;

@Schema({ timestamps: true })
export class Slide {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: mongo.ObjectId, ref: 'Presentation' })
  presentationId: string;

  @Prop({ type: [mongo.ObjectId], ref: 'Textblock' })
  textblocks: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SlideSchema = SchemaFactory.createForClass(Slide);

SlideSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
