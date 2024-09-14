import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @IsString()
  @Prop({ required: true })
  username: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;

  @IsStrongPassword({
    minLength: 1,
  })
  @Prop({ required: true })
  password: string;

  @IsBoolean()
  @Prop({ default: false })
  active: boolean;

  @Prop()
  avatar: string;

  @Prop()
  lastLogin: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  this.lastLogin = localDate;
  next();
});
