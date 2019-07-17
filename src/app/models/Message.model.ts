import { UserModel } from './userModel';
import { ThreadModel } from './Thread.model';

export class MessageModel {
  id: number;
  sentAt: Date;
  isRead: boolean;
  text: string;
  author: UserModel;
  thread: ThreadModel;
  constructor(id: number, sentAt: Date, isRead: boolean, text: string, author: UserModel, thread: ThreadModel) {
    this.id = id;
    this.sentAt = sentAt;
    this.isRead = isRead;
    this.text = text;
    this. author = author;
    this.thread = thread;
  }
}
