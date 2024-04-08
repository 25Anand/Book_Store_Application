import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { RedisModule } from 'src/providers/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    RedisModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema },
  ]),
  JwtModule.register({
    global: true,
    secret: 'BookStore',
    signOptions: { expiresIn: '2hr' },
  }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
