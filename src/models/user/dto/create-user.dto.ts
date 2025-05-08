import { IsEmail, IsEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmpty({message : "username tidak boleh kosong", groups : ['create', 'update']})
  username: string;
  @IsEmail()
  email: string;
  name: string;
  password: string;
}
