import { inject, Injectable } from '@angular/core';
import { Bulb } from '../models/bulb';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BulbService {

  ip  : string = "192.168.8.113";
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

  constructor(private apiService: ApiService) { this.apiService = apiService }

  getAllBulbs(): Bulb[] {
    return this.bulbList;
  }
  getBulbById(id: number): Bulb | undefined {
    return this.bulbList.find((bulb) => bulb.id === id);
  }

  async submitBrightness(brightness: string) {
    console.log("Submit brightness");
    await this.apiService.setBrightness("192.168.8.113", Number(brightness))
  }

  async submitTemperature(temperature: string) {
    console.log("Submit temperature");
    await this.apiService.setTemperature("192.168.8.113", Number(temperature))
  }

  async submitColor(hue: string, saturation: string, value: string) {
    console.log("Submit color");
    await this.apiService.setColour("192.168.8.113", Number(hue), Number(saturation), Number(value))
  }

  async getParameters() {
    console.log("Get properties from API");
    try {
      const response = await lastValueFrom(await this.apiService.getParameters("192.168.8.113"));
      console.log("Data in bulbService: ", response);
      return response;
    } catch (error) {
      console.log("Error while getting properties", error);
      throw error;
    }
  }
}
