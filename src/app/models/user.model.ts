export class AuthUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public redirect?: boolean
  ) { }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) { return null; }
    return this._token;
  }

  get tokenExpirationDate() {
    if (this._tokenExpirationDate) {
      return this._tokenExpirationDate;
    }
    return null;
  }
}
