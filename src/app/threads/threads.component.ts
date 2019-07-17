import {Component, OnInit } from '@angular/core';
import {ThreadService} from '../services/thread.service';
import {ThreadModel} from '../models/Thread.model';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
  threads: ThreadModel [];
  constructor(private threadService: ThreadService, private messageService: MessageService) { }

  ngOnInit() {
    this.threads = this.threadService.getThreads();
    this.messageService.onThreadChanges.subscribe(
      (thread: ThreadModel) => this.threads[thread.id] = thread
    );
  }

  onThreadClick(index: number) {
   this.threadService.onSelectThread(index);
  }
}
