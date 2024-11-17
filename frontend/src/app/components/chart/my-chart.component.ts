import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Parameters } from '../../models/parameters';
import { ParametersTab } from '../../models/parametersTab'

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule,
  ChartComponent,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: any; //ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  grid: any; //ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-my-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './my-chart.component.html',
  styleUrl: './my-chart.component.css'
})
export class MyChartComponent implements OnChanges {
  @ViewChild("chart") chart: ChartComponent | undefined;

  @Input() parameters!: Parameters;
  parametersTab: ParametersTab = new ParametersTab;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameters']) {
      console.log('Zmiana w parameters:', changes['parameters'].currentValue);
      this.parametersTab.current.push(changes['parameters'].currentValue.current);
      this.parametersTab.voltage.push(changes['parameters'].currentValue.voltage);
      this.parametersTab.power.push(changes['parameters'].currentValue.power);
      this.parametersTab.hue.push(changes['parameters'].currentValue.hue);
      this.parametersTab.saturation.push(changes['parameters'].currentValue.saturation);
      this.parametersTab.value.push(changes['parameters'].currentValue.value);
      this.parametersTab.brightness.push(changes['parameters'].currentValue.brightness);
      this.parametersTab.temperature.push(changes['parameters'].currentValue.temperature);
      this.parametersTab.energy.push(changes['parameters'].currentValue.energy);

      // Aktualizacja serii wykresów
      this.chartVoltageOptions.series = [{ name: "Voltage", data: this.parametersTab.voltage }];
      this.chartCurrentOptions.series = [{ name: "Current", data: this.parametersTab.current }];
      this.chartPowerOptions.series = [{ name: "Power", data: this.parametersTab.power }];
      this.chartEnergyOptions.series = [{ name: "Energy", data: this.parametersTab.energy }];
      this.chartBrightnessOptions.series = [{ name: "Brightness", data: this.parametersTab.brightness }];
      this.chartTemperatureOptions.series = [{ name: "Temperature", data: this.parametersTab.temperature }];
      this.chartValueOptions.series = [{ name: "Value", data: this.parametersTab.value }];
      this.chartSaturationOptions.series = [{ name: "Saturation", data: this.parametersTab.saturation }];
      this.chartHueOptions.series = [{ name: "Hue", data: this.parametersTab.hue }];
    }
  }

  public chartVoltageOptions: Partial<ChartOptions>;
  public chartCurrentOptions: Partial<ChartOptions>;
  public chartPowerOptions: Partial<ChartOptions>;
  public chartBrightnessOptions: Partial<ChartOptions>;
  public chartTemperatureOptions: Partial<ChartOptions>;
  public chartValueOptions: Partial<ChartOptions>;
  public chartSaturationOptions: Partial<ChartOptions>;
  public chartHueOptions: Partial<ChartOptions>;
  public chartEnergyOptions: Partial<ChartOptions>;
  public commonOptions: Partial<ChartOptions> = {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "straight"
    },
    toolbar: {
      tools: {
        selection: false
      }
    },
    markers: {
      size: 6,
      hover: {
        size: 10
      }
    },
    tooltip: {
      followCursor: false,
      theme: "dark",
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return "aaaa";
          }
        }
      }
    },
    grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
  };

  constructor() {

    this.chartVoltageOptions = {
      title: {
        text: "Napięcie"
      },
      series: [
        {
          name: "Voltage",
          data: this.parametersTab.voltage
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#008FFB"],
      yaxis: {
        min:0,
        max:230,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chartCurrentOptions = {
      title: {
        text: "Zużycie prądu"
      },
      series: [
        {
          name: "Current",
          data: this.parametersTab.current
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#546E7A"],
      yaxis: {
        min:0,
        max:0.3,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chartPowerOptions = {
      title: {
        text: "Zużycie mocy"
      },
      series: [
        {
          name: "Power",
          data: this.parametersTab.power
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:9,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chartEnergyOptions = {
      title: {
        text: "Energia zużywana przez żarówkę"
      },
      series: [
        {
          name: "Energy",
          data: this.parametersTab.energy
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:2,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chartBrightnessOptions = {
      title: {
        text: "Jasność żarówki"
      },
      series: [
        {
          name: "Brightness",
          data: this.parametersTab.brightness
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:100,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chartTemperatureOptions = {
      title: {
        text: "Temperatura światła"
      },
      series: [
        {
          name: "Temperature",
          data: this.parametersTab.temperature
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:2501,
        max:6519,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chartValueOptions = {
      title: {
        text: "Wartość światła"
      },
      series: [
        {
          name: "Power",
          data: this.parametersTab.value
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:100,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chartSaturationOptions = {
      title: {
        text: "Nasycenie światła"
      },
      series: [
        {
          name: "Saturation",
          data: this.parametersTab.saturation
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:100,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chartHueOptions = {
      title: {
        text: "Odcień światła"
      },
      series: [
        {
          name: "Hue",
          data: this.parametersTab.hue
        }
      ],
      chart: {
        id: "yt",
        group: "social",
        type: "area",
        height: 300
      },
      colors: ["#00E396"],
      yaxis: {
        min:0,
        max:100,
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

  }


}

