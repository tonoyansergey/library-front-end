export class Author {

  private _id: number;
  private _authorName: string;


  constructor(id: number, authorName: string) {
    this._id = id;
    this._authorName = authorName;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get authorName(): string {
    return this._authorName;
  }

  set authorName(value: string) {
    this._authorName = value;
  }
}
