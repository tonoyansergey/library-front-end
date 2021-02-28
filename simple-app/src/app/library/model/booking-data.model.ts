import {Book} from "./book.model";
import {User} from "./user.model";

export class BookingData {

  private _id: number;
  private _user: User;
  private _book: Book;
  private _receiptCode: string;
  private _expireDate: string;


  constructor(id: number,user: User, book: Book, receiptCode: string, bookingDate: string) {
    this._id = id;
    this._user = user;
    this._book = book;
    this._receiptCode = receiptCode;
    this._expireDate = bookingDate;
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

  get receiptCode(): string {
    return this._receiptCode;
  }

  set receiptCode(value: string) {
    this._receiptCode = value;
  }

  get expireDate(): string {
    return this._expireDate;
  }

  set expireDate(value: string) {
    this._expireDate = value;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }


}
