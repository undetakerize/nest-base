import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { RegisterDto } from "src/models/userLogon/dto/register-user.dto";

@Injectable()
export class RegisterPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const errors: string[] = [];
        if (!this.valueHasPassAndConfPass(value)) {
        throw new BadRequestException('Invalid Request Body');
        }
        if (value.password.length < 12) {
        errors.push('password should be at least 12 characters long');
        }
        if (value.password !== value.confirmationPassword) {
        errors.push('password and confirmationPassword do not match');
        }
        if (errors.length) {
        throw new BadRequestException(errors.join('\n'));
        }
        return value;
    }
    private valueHasPassAndConfPass(val: unknown): val is RegisterDto {
        return (
          typeof val === 'object' &&
          'password' in val &&
          'confirmationPassword' in val
        );
      }

}