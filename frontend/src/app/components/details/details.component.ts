import { ApplicationRef, ChangeDetectorRef, Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BulbComponent } from '../bulb/bulb.component';
import { Bulb } from '../../models/bulb';
import { BulbService } from '../../services/bulb.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MyChartComponent } from '../chart/my-chart.component';
import { first } from 'rxjs';
import { Parameters } from '../../models/parameters';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MyChartComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  bulb: Bulb | undefined;
  bulbService = inject(BulbService);
  public parameters: Parameters = new Parameters;
  private intervalId: any;
  private intervalDuration: number = 10000;

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

  constructor(private applicationRef: ApplicationRef, private cdr: ChangeDetectorRef) {
    const bulbId = Number(this.route.snapshot.params['id']);
    this.bulb = this.bulbService.getBulbById(bulbId);
  }

  ngOnInit(): void {
    // run this code after the application is stable
    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.intervalId = setInterval(() => {
        this.getParameters();
      }, this.intervalDuration)
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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

  async getParameters() {
    console.log("Get parameters in DetailsComponent");
    try {
      const data = await this.bulbService.getParameters();
      console.log("Data in details: ", data);
      this.parameters = {
        ...this.parameters, current: data.current,
        voltage: data.voltage,
        power: data.power,
        hue: data.hue,
        saturation: data.saturation,
        value: data.value,
        temperature : data.temperature,
        brightness : data.brightness,
        energy : data.energy

      };
      this.cdr.detectChanges();
    } catch (error) {
      console.log("Error in DetailsComponent:", error);
    }
  }
}
