import { Injectable } from "@nestjs/common";

@Injectable()
export class UserLogonService {
    private readonly users = [
        {
            userId: 1 ,
            username: 'john',
            password: 'password',
        },
        {
            userId: 2 ,
            username : 'melissa',
            password: 'secret',
        },
    ];

    async findOne(username: string): Promise<any | undefined> {
        return this.users.find(user => user.username === username);
    }
}