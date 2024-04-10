import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'BookStore',
      signOptions: { expiresIn: '2hr' },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/hotel_management'),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
