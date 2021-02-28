export class User {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _userName: string;
  private _email: string;
  private _role: string;

  constructor(id: number, firstName: string, lastName: string, userName: string, email: string, role: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._userName = userName;
    this._email = email;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
}
