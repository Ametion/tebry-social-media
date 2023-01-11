export class AccountResponse {
    public readonly accountId: number;
    public readonly accountLogin: string;
    public readonly accountFirstName: string;
    public readonly accountSecondName: string;
    public readonly accountDescription: string;
    public readonly accountProfileImage: string;

    constructor(accountId: number, accountLogin: string, accountFirstName: string, accountSecondName: string, accountDescription: string, accountProfileImage: string) {
        this.accountId = accountId;
        this.accountLogin = accountLogin;
        this.accountFirstName = accountFirstName;
        this.accountSecondName = accountSecondName;
        this.accountDescription = accountDescription;
        this.accountProfileImage = accountProfileImage;
    }
}