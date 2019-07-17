import {UserModel} from './userModel';

export class ThreadModel extends UserModel {
  public id: number;
  public name: string;
  public avatarSrc: string;
  public lastMessage: string;
  constructor(id: number, name: string, avatarSrc: string, lastMessage: string) {
    super(id, name, avatarSrc);
    this.lastMessage = lastMessage;
  }
}
