export interface Users {
    id: number;
    username: string;
    role: string;
    confirmed: boolean;
}

export interface UsersProfile {
    username: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
}

export class ChangePassword {
    UserId: number;
    Password: string;
    NewPassword: string;
    ConfirmPassword: string;
}
