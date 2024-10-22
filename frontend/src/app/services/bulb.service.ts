import { inject, Injectable } from '@angular/core';
import { Bulb } from '../models/bulb';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BulbService {

  apiService = inject(ApiService)
  
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
  
  constructor(private apiService: ApiService) { this.apiService = apiService}

  getAllBulbs(): Bulb[] {
    return this.bulbList;
  }
  getBulbById(id: number): Bulb | undefined {
    return this.bulbList.find((bulb) => bulb.id === id);
  }

  async submitBrightness(brightness: string) {
    console.log("Submit brightness");
    (await this.apiService.setBrightness("192.168.101.9", Number(brightness))).subscribe(
      res => {
        console.log("Res:", res);
      },
      error => {
        console.error('Error setting brightness: ', error);
      })
  }

  async submitTemperature(temperature: string) {
    console.log("Submit temperature");
    (await this.apiService.setTemperature("192.168.101.9", Number(temperature))).subscribe(
      res => {
        console.log("Res: ", res);
      },
      error => {
        console.error('Error setting temperatur: ', error)
      })
  }

  async submitColor(hue: string, saturation: string, value: string) {
    console.log("Submit color");
    (await this.apiService.setColour("192.168.101.9",Number(hue), Number(saturation), Number(value) )).subscribe(
      res => {
        console.log("Res: ", res );
      },
      error => {
        console.error('Error setting color: ', error)
      }
    )
  }

  async submitBrightness(brightness: string) {
    console.log("submit")
    console.log("Submit brightness");
    (await this.apiService.setBrightness("192.168.101.9", Number(brightness))).subscribe(
      res => {
        console.log("Res:", res);
      },
      error => {
        console.error('Error setting brightness: ', error);
      })
  }

  async submitTemperature(temperature: string) {
    console.log("Submit temperature");
    (await this.apiService.setTemperature("192.168.101.9", Number(temperature))).subscribe(
      res => {
        console.log("Res: ", res);
      },
      error => {
        console.error('Error setting temperatur: ', error)
      })
  }
  async submitColor(hue: string, saturation: string, value: string) {
    console.log("Submit color");
    (await this.apiService.setColour("192.168.101.9",Number(hue), Number(saturation), Number(value) )).subscribe(
      res => {
        console.log("Res: ", res );
      },
      error => {
        console.error('Error setting color: ', error)
      }
    )
  }
}
