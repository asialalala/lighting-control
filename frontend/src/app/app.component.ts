import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { error } from 'node:console';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { PlaceholderComponent } from "./components/placeholder/placeholder.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, PlaceholderComponent, NgIf],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newdata: any;
  onlineEvent: Observable<Event> | undefined;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage!: string;
  connectionStatus!: string;

  constructor(private _apiservice: ApiService) { }

  ngOnInit() {
    console.log("Get data")
    this.getData();

     this.onlineEvent = fromEvent(window, 'online');
     this.offlineEvent = fromEvent(window, 'offline');

     this.subscriptions.push(this.onlineEvent.subscribe(e => {
       this.connectionStatusMessage = 'Back to online';
       this.connectionStatus = 'online';
       console.log('Online...');
     }));

     this.subscriptions.push(this.offlineEvent.subscribe(e => {
       this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
       this.connectionStatus = 'offline';
       console.log('Offline...');
     }));
  }

  getData() {
    this._apiservice.getdata().subscribe(
      res => {
        console.log("Res:", res);
        this.newdata = res;
      },
      error => {
        console.error('Error fetching data:', error);
      })
  }
}
