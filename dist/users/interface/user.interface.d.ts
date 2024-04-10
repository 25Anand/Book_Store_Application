export interface IUser {
    username: string;
    email: string;
    password: string;
    userRole: 'Author' | 'Admin' | 'Retail Users';
}
