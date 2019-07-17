import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../services/message.service';
import {MessageModel} from '../models/Message.model';
import {ThreadModel} from '../models/Thread.model';
import {Subscription} from 'rxjs';
import {UserServices} from '../services/user.services';
import {ThreadService} from '../services/thread.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewChecked {
  subscriptionToSettingThread: Subscription;
  subscriptionToSettingMessages: Subscription;
  messages: MessageModel [];
  messagesFromThreadWithId: MessageModel [];
  currentThread: ThreadModel;
  // @ts-ignore
  @ViewChild('messageInput') messageInputElement: ElementRef;
  // @ts-ignore
  @ViewChild('panel') scrollToBottomElement: ElementRef;
  constructor(private messageService: MessageService, private userService: UserServices, private threadService: ThreadService) {
  }
    ngOnInit() {
    this.messageService.currentUser = this.userService.getUser(1);
    this.subscriptionToSettingMessages = this.messageService.onMessageChanges.subscribe(
      (messages: MessageModel[]) => {
        this.messages = messages;
        this.messagesFromThreadWithId = this.messageService.getMessagesWithIndex(this.messageService.currentId);
        this.messageInputElement.nativeElement.focus();
      }
    );
    this.subscriptionToSettingThread = this.messageService.threadClicked.subscribe(
      (thread: ThreadModel) => {
        this.messageService.currentThread = thread;
        this.currentThread = thread;
        this.messageService.currentId = this.messageService.currentThread.id;
        this.messageService.messages[this.messageService.currentId].isRead = true;
        this.messageService.onMessageChanges.next(this.messages);
        this.messagesFromThreadWithId = this.messageService.getMessagesWithIndex(this.messageService.currentId);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscriptionToSettingThread.unsubscribe();
    this.subscriptionToSettingMessages.unsubscribe();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  buttonCloseClicked() {
    this.threadService.sendChanges.next(false);
  }
  scrollToBottom(): void {
    this.scrollToBottomElement.nativeElement.scrollTop = this.scrollToBottomElement.nativeElement.scrollHeight;
  }
  sendMessage(messageInputElement: string) {
    this.messageService.setNewMessages(messageInputElement);
    this.messageInputElement.nativeElement.value = '';
  }
}
