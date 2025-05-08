import { User } from './../user/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserGender } from "./enums/user-details-gender.enum";
import { IsString, Length, Matches } from "class-validator";

@Entity('user_details')
export class UserDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    address: string;
    @Column({type: 'enum' , enum: UserGender, default: UserGender.MALE})
    gender: UserGender;
    @Column()
    country: string;
    @Column()
    city: string;
    @Column()
    job: string;
    @Column({ type: 'varchar', length: 12 })
    @IsString()
    @Length(12, 12, { message: 'Phone number must be exactly 12 digits' })
    @Matches(/^\d{12}$/, { message: 'Phone number must contain only digits' })
    phoneNumber: string;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;


}