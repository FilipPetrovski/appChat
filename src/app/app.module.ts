import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ThreadsComponent } from './threads/threads.component';
import {ThreadService} from './services/thread.service';
import { MessageComponent } from './message/message.component';
import {MessageService} from './services/message.service';
import {FormsModule} from '@angular/forms';
import {UserServices} from './services/user.services';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ThreadsComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ThreadService, MessageService, UserServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
