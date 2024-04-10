import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer';
import { ProducerService } from './producer/producer';
import { MailService } from 'src/nodeMailer/nodeMailer';
import { UsersModule } from 'src/users/users.module';
import { UserModel } from 'src/users/schema/user.schema';
import { ConfigModule } from '@nestjs/config';
// import { ConsumerModule } from './consumer/consumer.module';


@Module({
    imports:[
      UsersModule,
      ConfigModule.forRoot(),
      // ConsumerModule
    ],
  providers: [ConsumerService,ProducerService,MailService,UserModel],
    exports:[ConsumerService,ProducerService]
})
export class RabbitMQModule {}
