import { Component } from '@angular/core';
import { BulbComponent } from '../bulb/bulb.component';
import { CommonModule } from '@angular/common';
import { Bulb } from '../../models/bulb';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BulbComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  bulbList: Bulb[] = [{
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }, {
    id: 1,
    ip: "123-123-123",
    saturation: 2,
    hue: 54,
    value: 23,
    brightness: 25,
    temperature: 33,
    photo: `../../../assets/images/light.png`,
  }];
}
