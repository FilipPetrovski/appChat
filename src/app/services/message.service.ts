import {MessageModel} from '../models/Message.model';
import {ThreadModel} from '../models/Thread.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserModel} from '../models/userModel';

export class MessageService {
  messages: MessageModel [];
  threadClicked: BehaviorSubject<ThreadModel> = new BehaviorSubject<ThreadModel>(null);
  onMessageChanges: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>(null);
  onThreadChanges: Subject<ThreadModel> = new Subject<ThreadModel>();
  currentThread: ThreadModel;
  currentId: number;
  messageId = 4;
  messagesFromThreadWithId: MessageModel[];
  currentUser: UserModel;
  constructor() {
    this.messages = [
      new MessageModel(0, new Date(), false, 'some text i send', null, new ThreadModel(0, 'Echo Bot', 'htt' +
        'ps://upload.wikimedia.org/wikipedia/commons/thumb/1/12/' +
        'User_icon_2.svg/220px-User_icon_2.svg.png', 'I will echo whatever you send me')),
      new MessageModel(1, new Date(), false, 'some text i send', null, new ThreadModel(1, 'Reverse Bot', 'htt' +
        'ps://encrypted-tbn0.gstatic.com/' +
        'images?q=tbn:ANd9GcQMvP41uCHpFhTvnGBw_XaR2ZVRjvVB_uRS0FJ2QfH1GrxGBEHc', 'Reverse text')),
      new MessageModel(2, new Date(), false, 'some text i send', null, new ThreadModel(2, 'Waiting Bot', 'http' +
        '://files.softicons.com/download/' +
        'application-icons/toolbar-icons-by-gentleface/png/512/user.png', 'I will wait however many seconds you send me to repsond. ' +
        'Try sending 3')),
      new MessageModel(3, new Date(), false, 'some text i send', null, new ThreadModel(3, 'Lady Capul' +
        'et', 'https://banner2.kisspng.com/20180317/hse/kisspng-computer-icons-user-clip-' +
    'art-computer-user-clipart-5aad15e8425433.2847546715212927762717.jpg', 'shall you feel the loss, but not the friend that ' +
        'you weep for')),
    ];
    this.onMessageChanges.next(this.messages);
  }
  getUnreadMessages(): number {
    let unread = 0;
    for (const message of this.messages) {
      if (!message.isRead) {
        unread++;
      }
    }
    return unread;
  }
  setNewMessages(messageInputElement: string) {
    if (messageInputElement) {
      let newThread;
      const messageInputValue = messageInputElement;
      // tslint:disable-next-line:max-line-length
      newThread = new ThreadModel(this.currentThread.id, this.currentThread.name, this.currentThread.avatarSrc, messageInputValue);
      if (this.currentId === 0) {
        const newMsg = new MessageModel(this.messageId, new Date(), true, messageInputValue, this.currentUser, newThread);
        this.messageId++;
        const newMsgBot = new MessageModel(this.messageId, new Date(), true, messageInputValue, null, newThread);
        this.messages.push(newMsg);
        this.messages.push(newMsgBot);
        this.onMessageChanges.next(this.messages);
        this.onThreadChanges.next(newThread);
      }
      if (this.currentId === 1) {
        const s: string = messageInputElement;
        // tslint:disable-next-line:max-line-length
        const newThreadReverse = new ThreadModel(this.currentThread.id, this.currentThread.name, this.currentThread.avatarSrc, s.split('').reverse().join(''));
        const newMsg = new MessageModel(this.messageId, new Date(), true, s, this.currentUser, newThread);
        this.messageId++;
        const newMsgThread = new MessageModel(this.messageId, new Date(), true, s, null, newThreadReverse);
        this.messages.push(newMsg);
        this.messages.push(newMsgThread);
        this.onMessageChanges.next(this.messages);
        this.onThreadChanges.next(newThread);
      }
      if (this.currentId === 2) {
        const timeLength: number = parseInt(messageInputElement, null);
        const newMsg = new MessageModel(this.messageId, new Date(), true, messageInputValue, this.currentUser, newThread);
        this.messageId++;
        const newMsgDelay = new MessageModel(this.messageId, new Date(), true, messageInputValue, null, newThread);
        this.messages.push(newMsg);
        this.onMessageChanges.next(this.messages);
        this.onThreadChanges.next(newThread);
        setTimeout(
          () => {
            this.messages.push(newMsgDelay);
            this.onMessageChanges.next(this.messages);
          }, timeLength * 1000);
      }
      if (this.currentId === 3) {
        const newMsg = new MessageModel(this.messageId, new Date(), true, messageInputValue, this.currentUser, newThread);
        this.messages.push(newMsg);
        this.onThreadChanges.next(newThread);
        this.onMessageChanges.next(this.messages);
      }
      this.messagesFromThreadWithId = this.getMessagesWithIndex(this.currentId);
      this.messageId++;
    } else {
      alert('you cant send an empty message');
    }
  }
  getMessagesWithIndex(index: number): MessageModel[] {
    // @ts-ignore
    const newMessages: MessageModel[] = [];
    for (const message of this.messages) {
      if (message.thread.id === index) {
        newMessages.push(message);
      }
    }
    return newMessages;
  }

}
