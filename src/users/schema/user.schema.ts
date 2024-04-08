import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['Author', 'Admin', 'Retail Users'] })
    userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(User);