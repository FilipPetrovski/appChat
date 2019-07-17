import { Component, OnInit } from '@angular/core';
import {MessageService} from '../services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  unreadMessages: number;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.onMessageChanges.subscribe(
      () => this.unreadMessages = this.messageService.getUnreadMessages()
    );
  }
}
