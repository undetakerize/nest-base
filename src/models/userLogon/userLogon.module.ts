import { Module } from "@nestjs/common";
import { UserLogonService } from "./userLogon.service";

@Module({
    providers: [UserLogonService],
    exports:[UserLogonService],
})
export class UserLogon{}