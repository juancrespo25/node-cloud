import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({
    type: String,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    default: uuidv4,
    select: false,
  })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ unique: true })
  code: string;

  //campos de auditoria

  @Prop({ default: () => true })
  is_active: boolean;

  @Prop({ default: () => new Date() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({ required: true })
  created_user: string;

  @Prop()
  updated_user: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
