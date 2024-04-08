import { UsersService } from "./users.service";
import { CreateUserDto, LoginDto } from "./dto/user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signUp(response: any, createUserDto: CreateUserDto): Promise<any>;
    login(response: any, loginOtpDto: LoginDto): Promise<any>;
    getUser(request: any, response: any): Promise<any>;
}
