import { IsNotEmpty } from "class-validator";

export class IdParamUserDto{
    @IsNotEmpty()
    id: string;
}