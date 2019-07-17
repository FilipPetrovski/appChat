export class UserModel {
  public id: number;
  public name: string;
  public avatarSrc: string;
   constructor(id: number, name: string, avatarSrc: string) {
    this.id = id;
    this.name = name;
    this.avatarSrc = avatarSrc;
  }
}
