import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { error } from 'node:console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newdata: any;

  constructor(private _apiservice: ApiService) { }

  ngOnInit() {
    console.log("Get data")
    this.getData();
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
