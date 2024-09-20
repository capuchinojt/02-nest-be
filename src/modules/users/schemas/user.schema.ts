import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

// Define the type for a user document retrieved from the database.
export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string

  @Prop()
  phone: string

  @Prop()
  address: string

  @Prop()
  image: string

  @Prop()
  role: string

  @Prop()
  accountType: string

  @Prop()
  isActive: boolean

  @Prop()
  codeId: string

  @Prop()
  codeExpired: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
