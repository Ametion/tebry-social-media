export class UserResponse{
    public readonly userId: number;
    public readonly userLogin: string;
    public readonly userFirstName: string;
    public readonly userSecondName: string;

    constructor(userId: number, userLogin: string, userFirstName: string, userSecondName: string) {
        this.userId = userId;
        this.userLogin = userLogin;
        this.userFirstName = userFirstName;
        this.userSecondName = userSecondName;
    }
}