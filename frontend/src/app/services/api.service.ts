import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "node:console";
import { Observable } from "rxjs";
import { Parameters } from '../models/parameters';

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
      const body = { temperature: `${temperature}` };
      const data = await this._http.put<any>(`http://127.0.0.1:5000/api/set-temperature/${ip}`, body);
      console.log("setTemperature data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting temperature:', error);
      throw error;
    }
  }

  async setColour(ip: string, hue: number, saturation: number, value: number) {
    try {
      const body = { hue: `${hue}`, saturation: `${saturation}`, value: `${value}` };
      const data = await this._http.put(`http://127.0.0.1:5000/api/set-colour/${ip}`, body);
      console.log("setColour data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting colour:', error);
      throw error;
    }
  }

  async setBrightness(ip: string, brightness: number) {
    try {
      const body = { brightness: `${brightness}`};
      const data = await this._http.get(`http://127.0.0.1:5000/api/set-brightness/${ip}`);
      console.log("setBrightness data: ", data);
      return data;
    } catch (error) {
      console.error('Error while setting brightness:', error);
      throw error;
    }
  }

  async getParameters(ip: string) : Promise<Observable<Parameters>> {

      return await this._http.get<Parameters>(`http://127.0.0.1:5000/api/get-parameters/${ip}`);
  }

}
