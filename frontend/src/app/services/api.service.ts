import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getdata() {
    return this._http.get('http://127.0.0.1:5000/api/data');
  }

  async getAllDevices() {
    try {
      const data = await this._http.get('http://127.0.0.1:5000/api/api/get-devices');
      console.log("getAllDevices data: ", data);
      return data;
    } catch (error) {
      console.error('Error while getting devices:', error);
      throw error;
    }
  }

  async turnOn(ip: string) {
    try {
      const data = await this._http.get(`http://127.0.0.1:5000/api/turn-on/${ip}`);
      console.log("turnOn data: ", data);
      return data;
    } catch (error) {
      console.error('Error while turning on:', error);
      throw error;
    }
  }

  async turnOff(ip: string) {
    try {
      const data = await this._http.get(`http://127.0.0.1:5000/api/turn-off/${ip}`);
      console.log("turnOff data: ", data);
      return data;
    } catch (error) {
      console.error('Error while turning off:', error);
      throw error;
    }
  }

  async setTemperature(ip: string, temperature: number) {
    try {
      const data = await this._http.get('http://127.0.0.1:5000/api/set-temperature');
      console.log("setTemperature data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting temperature:', error);
      throw error;
    }
  }

  async setColour(ip: string, hue: number, saturation: number, value: number) {
    try {
      const data = await this._http.get('http://127.0.0.1:5000/api/set-colour/');
      console.log("setColour data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting colour:', error);
      throw error;
    }
  }

  async setBrightness(ip: string, brightness: number) {
    try {
      const data = await this._http.get('http://127.0.0.1:5000/api/set-brightness/');
      console.log("setBrightness data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting brightness:', error);
      throw error;
    }
  }


}
