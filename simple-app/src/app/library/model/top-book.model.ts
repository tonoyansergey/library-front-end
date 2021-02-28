import {Book} from "./book.model";

export class TopBook {

  private _id: number;
  private _object: any;
  private _count: number;


  constructor(id: number, book: any, count: number) {
    this._id = id;
    this._object = book;
    this._count = count;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get object(): any {
    return this._object;
  }

  set object(value: any) {
    this._object = value;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }
}
