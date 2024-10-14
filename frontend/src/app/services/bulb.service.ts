import { Injectable } from '@angular/core';
import { Bulb } from '../models/bulb';

@Injectable({
  providedIn: 'root'
})
export class BulbService {

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

  constructor() { }

  getAllBulbs(): Bulb[] {
    return this.bulbList;
  }
  getBulbById(id: number): Bulb | undefined {
    return this.bulbList.find((bulb) => bulb.id === id);
  }
}
