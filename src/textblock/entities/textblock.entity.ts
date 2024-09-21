import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type TextblockDocument = HydratedDocument<Textblock>;

@Schema({ timestamps: true })
export class Textblock {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  fontSize: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  fontFamily: string;

  @Prop({ required: true })
  fontStyle: string;

  @Prop({ required: true })
  backgoundColor: string;

  @Prop({ required: true })
  textAlign: string;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true, type: mongo.ObjectId, ref: 'Slide' })
  slideId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TextblockSchema = SchemaFactory.createForClass(Textblock);

TextblockSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
