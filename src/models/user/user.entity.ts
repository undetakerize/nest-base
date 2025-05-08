import { UserDetails } from './../user-details/used-details.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;
  @Column()
  username: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  @MinLength(3)
  password: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  refresh_token?: string; 

  @OneToOne(() => UserDetails, userDetails => userDetails.user)
  userDetails: UserDetails;
}
