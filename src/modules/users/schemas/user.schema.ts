import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

// Define the type for a user document retrieved from the database.
export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true, select: false })
  password: string

  @Prop()
  phone: string

  @Prop()
  address: string

  @Prop()
  image: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ default: 'local' })
  accountType: string

  @Prop({ default: false })
  isActive: boolean

  @Prop()
  codeId: string

  @Prop()
  codeExpired: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
