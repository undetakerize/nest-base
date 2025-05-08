import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    confirmationPassword: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
}