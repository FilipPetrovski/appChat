import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThreadService} from './services/thread.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private threadService: ThreadService) {}
  selected = false;
  subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.threadService.sendChanges.subscribe(
      (selection: boolean) => this.selected = selection
    );
  }
  ngOnDestroy(): void {
    this.selected = false;
    this.subscription.unsubscribe();
  }
}

