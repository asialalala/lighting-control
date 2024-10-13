import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-control-menu',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './control-menu.component.html',
  styleUrl: './control-menu.component.css'
})
export class ControlMenuComponent {

  messageLabel: string = "turn on";

  constructor(private _apiservice: ApiService) { }

  onButtonClick() {
    console.log('Przycisk został kliknięty!');

    if (this.messageLabel === "turn off") {
      this.messageLabel = "turn on";

      this._apiservice.turnOff().subscribe(
        res => {
          console.log("Światło wyłączone:", res);
        },
        error => {
          console.error('Błąd przy wyłączaniu światła:', error);
          this.messageLabel = "turn off"; // Przywracanie etykiety w przypadku błędu
        }
      );

    } else {
      this.messageLabel = "turn off";

      this._apiservice.turnOn().subscribe(
        res => {
          console.log("Światło włączone:", res);
        },
        error => {
          console.error('Błąd przy włączaniu światła:', error);
          this.messageLabel = "turn on"; // Przywracanie etykiety w przypadku błędu
        }
      );
    }
  }
}
