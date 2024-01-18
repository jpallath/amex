import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export class FullAddress extends Document {
  @Prop()
  streetAddress: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  postcode: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  profileImage: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  fullAddress: FullAddress;

  @Prop()
  emailAddress: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
