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
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MyChartComponent, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  bulb: Bulb | undefined;
  bulbService = inject(BulbService);
  public parameters: Parameters | undefined;
  public label = "Generuj wykres";
  public chartLabelControl = "temperature"
  private isChart = false;
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
ChartLabel: any;

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
    this.bulbService.submitBrightness(
      this.brightnessForm.value.brightness ?? ''
    );
  }
  submitTemperature() {
    this.bulbService.submitTemperature(
      this.temperatureForm.value.temperature ?? ''
    );
  }
  submitColor() {
    this.bulbService.submitColor(
      this.colorForm.value.hue ?? '',
      this.colorForm.value.saturation ?? '',
      this.colorForm.value.value ?? '',
    );
  }

  async getParameters() {
    if (this.isChart) {
      try {
        const data = await this.bulbService.getParameters();
        this.parameters = {
          ...this.parameters, current: data.current,
          voltage: data.voltage,
          power: data.power,
          hue: data.hue,
          saturation: data.saturation,
          value: data.value,
          temperature: data.temperature,
          brightness: data.brightness,
          energy: data.energy

        };
        this.cdr.detectChanges();
      } catch (error) {
        console.log("Error in DetailsComponent:", error);
      }
    }
  }

  onDo() {
    if (!this.isChart) {
      this.label = "Przestań pobierać dane";
      this.isChart = true;
    } else {
      this.label = "Generuj wykres";
      this.isChart = false;
    }
  }
}
