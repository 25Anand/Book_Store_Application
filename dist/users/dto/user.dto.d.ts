export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    userRole: 'Author' | 'Admin' | 'Retail Users';
}
export declare class LoginDto {
    email: string;
    password: string;
}
