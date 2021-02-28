import {Author} from "./author.model";
import {Genre} from "./genre.model";

export class Book {

  private _id : number;
  private _title : string;
  private _author: Author;
  private _genre: Genre;
  private _quantity: number;

  constructor(id: number, bookName: string, author: Author, genre: Genre, quantity: number) {
    this._id = id;
    this._title = bookName;
    this._author = author;
    this._genre = genre;
    this._quantity = quantity;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get author(): Author {
    return this._author;
  }

  set author(value: Author) {
    this._author = value;
  }

  get genre(): Genre {
    return this._genre;
  }

  set genre(value: Genre) {
    this._genre = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }
}
