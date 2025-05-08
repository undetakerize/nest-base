import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserDetails } from './used-details.entity';
import { UserDetailsService } from './user-details.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserDetails])],
    providers: [UserDetailsService],
    exports:[UserDetailsService]
})
export class UserDetailsModule {}
