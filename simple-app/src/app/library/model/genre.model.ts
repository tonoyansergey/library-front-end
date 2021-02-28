export class Genre {

  private _id: number;
  private _genreName: string;


  constructor(id: number, genreName: string) {
    this._id = id;
    this._genreName = genreName;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get genreName(): string {
    return this._genreName;
  }

  set genreName(value: string) {
    this._genreName = value;
  }
}
