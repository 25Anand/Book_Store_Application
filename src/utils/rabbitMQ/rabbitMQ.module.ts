// import { Module } from '@nestjs/common';
// import { ConsumerService } from './consumer';
// // import { ProducerService } from './producer';
// import { MailService } from 'src/nodeMailer/nodeMailer';
// import { UsersModule } from 'src/users/users.module';
// import { UserModel } from '../../users/schema/user.schema';
// import { ConfigModule } from '@nestjs/config';
// // import { ConsumerModule } from './consumer/consumer.module';


// @Module({
//     imports:[
//       UsersModule,
//       ConfigModule.forRoot(),
//     ],
//   providers: [ConsumerService,MailService,UserModel],
//     exports:[ConsumerService]
// })
// export class RabbitMQModule {}
