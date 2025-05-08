import { Module, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../service/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { APP_PIPE } from '@nestjs/core';
import { UserDetailsModule } from '../user-details/user-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserDetailsModule
  ],
  controllers: [UserController],
  providers: [UserService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
  exports:[UserService],
})
export class UserModule {
//implements OnModuleInit {
  // onModuleInit() {
  //   console.log('🔥 UserModule Loaded!');
  // }
}
