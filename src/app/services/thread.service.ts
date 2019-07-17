import {ThreadModel} from '../models/Thread.model';
import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {Subject} from 'rxjs';

@Injectable()
export class ThreadService {
  threads: ThreadModel[] = [
    new ThreadModel(0, 'Echo Bot', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg' +
      '/220px-User_icon_2.svg.png', 'I will echo whatever you send me'),
    new ThreadModel(1, 'Reverse Bot', 'https://encrypted-tbn0.gstatic.com/' +
      'images?q=tbn:ANd9GcQMvP41uCHpFhTvnGBw_XaR2ZVRjvVB_uRS0FJ2QfH1GrxGBEHc', 'I will reverse whatever you send me'),
    new ThreadModel(2, 'Waiting Bot', 'http://files.softicons.com/download/' +
      'application-icons/toolbar-icons-by-gentleface/png/512/user.png', 'I will wait however many seconds ' +
      'you send me to respond. Try sending 3'),
    new ThreadModel(3, 'Lady Capulet', 'https://banner2.kisspng.com/20180317/hse/kisspng-computer-icons-user-clip-' +
      'art-computer-user-clipart-5aad15e8425433.2847546715212927762717.jpg', ' shall you feel the loss, ' +
      'but not the friend that you weep for'),
  ];
  constructor(private messageService: MessageService) {}
  isThreadSelected = false;
  selectedThreadId: number;
  sendChanges = new Subject<boolean>();
  getThreads() {
    return this.threads;
  }
  getThreadById(index: number) {
    return this.threads[index];
  }
  onSelectThread(index: number) {
    this.selectedThreadId = index;
    this.isThreadSelected = true;
    this.sendChanges.next(this.isThreadSelected);
    const threadSend = this.getThreadById(this.selectedThreadId);
    this.messageService.threadClicked.next(threadSend);
    this.isThreadSelected = false;
  }
}
