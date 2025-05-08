import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto{
    @ApiProperty()
    username: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    address: string | null;
}