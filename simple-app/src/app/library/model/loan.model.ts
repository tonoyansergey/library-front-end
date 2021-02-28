import {User} from "./user.model";
import {Book} from "./book.model";

export class Loan {

  private _id: number;
  private _user: User;
  private _book: Book;
  private _loanDate: string;
  private _expireDate: string;


  constructor(id: number, user: User, book: Book, loanDate: string, expireDate: string) {
    this._id = id;
    this._user = user;
    this._book = book;
    this._loanDate = loanDate;
    this._expireDate = expireDate;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get book(): Book {
    return this._book;
  }

  set book(value: Book) {
    this._book = value;
  }

  get loanDate(): string {
    return this._loanDate;
  }

  set loanDate(value: string) {
    this._loanDate = value;
  }

  get expireDate(): string {
    return this._expireDate;
  }

  set expireDate(value: string) {
    this._expireDate = value;
  }
}
