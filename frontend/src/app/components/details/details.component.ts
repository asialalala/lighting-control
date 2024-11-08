import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BulbComponent } from '../bulb/bulb.component';
import { Bulb } from '../../models/bulb';
import { BulbService } from '../../services/bulb.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyChartComponent } from '../chart/my-chart.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MyChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bulb: Bulb | undefined;
  bulbService = inject(BulbService)

  brightnessForm = new FormGroup({
    brightness: new FormControl(''),
  });

  temperatureForm = new FormGroup({
    temperature: new FormControl(''),
  });

  colorForm = new FormGroup({
    hue: new FormControl(''),
    saturation: new FormControl(''),
    value: new FormControl(''),
  });

  constructor() {
    const bulbId = Number(this.route.snapshot.params['id']);
    this.bulb = this.bulbService.getBulbById(bulbId);
  }

  submitBrightness() {
    console.log("Submit brightenss")
    this.bulbService.submitBrightness(
      this.brightnessForm.value.brightness ?? ''
    );
  }
  submitTemperature() {
    console.log("Submit temperature")
    this.bulbService.submitTemperature(
      this.temperatureForm.value.temperature ?? ''
    );
  }
  submitColor() {
    console.log("Submit color")
    this.bulbService.submitColor(
      this.colorForm.value.hue ?? '',
      this.colorForm.value.saturation ?? '',
      this.colorForm.value.value ?? '',
    );
  }

  getParameters() {
    console.log("Get parameters")
    this.bulbService.getParameters();
  }

}
