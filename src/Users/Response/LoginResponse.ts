export class LoginResponse{
    public readonly isLogged: boolean;
    public readonly token: string;

    constructor(isLogged: boolean, token: string) {
        this.isLogged = isLogged;
        this.token = token;
    }
}