import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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

  @Input() parameters: Parameters | undefined;
  parametersTab: ParametersTab = new ParametersTab;
  @Input() chartLabel: string | undefined;
  xAxisData = []
  I = []
  P = []

  titleI = "Zależność natężenia prądu od temperatury oświetlenia"
  titleP = "Zależność mocy czynnej od temperatury oświetlenia"
  titleXAxis = "Temperatura oświetlenia [K]"

  ngOnChanges(changes: SimpleChanges): void {
    if (this.parameters !== undefined && changes['parameters']) {
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
      this.chartSaturationOptions.series = [{ name: "Saturation", data: this.parametersTab.saturation }];
      this.chartHueOptions.series = [{ name: "Hue", data: this.parametersTab.hue }];
      this.chartIOptions.series = [{ name: "I", data: this.I }];
      this.chartPOptions.series = [{ name: "P", data: this.parametersTab.power}];
    }
    if (this.chartLabel !== undefined && changes['chartLabel']) {

      if (changes['chartLabel'].currentValue === "temperature") {
        console.log("Ustaw temperature");
        this.chartIOptions.title = {...this.chartIOptions.title, text: "Zależność natężenia prądu od temperatury oświetlenia"} ;
        this.chartPOptions.title = {...this.chartIOptions.title, text: "Zależność mocy czynnej od temperatury oświetlenia"} ;
        this.chartIOptions.xaxis!.title!.text = this.chartPOptions.xaxis!.title!.text = this.titleXAxis = "Temperatura oświetlenia [K]";
      } else if (changes['chartLabel'].currentValue === "brightness") {
        console.log("Ustaw jasność");
        this.chartIOptions.title = {...this.chartIOptions.title, text: "Zależność natężenia prądu od jasności oświetlenia"} ;
        this.chartPOptions.title = {...this.chartIOptions.title, text: "Zależność mocy czynnej od jasności oświetlenia"} ;
        this.chartIOptions.xaxis!.title!.text = this.chartPOptions.xaxis!.title!.text = this.titleXAxis = "Jasność oświetlenia [%]";

      } else if (changes['chartLabel'].currentValue === "hue") {
        console.log("Ustaw odcień");
        this.chartIOptions.title = {...this.chartIOptions.title, text: "Zależność natężenia prądu od odcienia barwy oświetlenia"} ;
        this.chartPOptions.title = {...this.chartIOptions.title, text: "Zależność mocy czynnej od odcienia barwy oświetlenia"} ;
        this.chartIOptions.xaxis!.title!.text = this.chartPOptions.xaxis!.title!.text = this.titleXAxis = "Odcień barwy oświetlenia RGB";
      } else if (changes['chartLabel'].currentValue === "saturation") {
        console.log("Ustaw nasycenie");
        this.chartIOptions.title = {...this.chartIOptions.title, text: "Zależność natężenia prądu od nasycenia barwy oświetlenia"} ;
        this.chartPOptions.title = {...this.chartIOptions.title, text: "Zależność mocy czynnej od nasycenia barwy oświetlenia"} ;
        this.chartIOptions.xaxis!.title!.text = this.chartPOptions.xaxis!.title!.text = this.titleXAxis = "Nasycenie barwy oświetlenia [%]";
      } else {
        console.log("Nieznana wartość chartLabel:", changes['chartLabel'].currentValue);
      }
    }
  }

  public chartVoltageOptions: Partial<ChartOptions>;
  public chartCurrentOptions: Partial<ChartOptions>;
  public chartPowerOptions: Partial<ChartOptions>;
  public chartBrightnessOptions: Partial<ChartOptions>;
  public chartTemperatureOptions: Partial<ChartOptions>;
  public chartSaturationOptions: Partial<ChartOptions>;
  public chartHueOptions: Partial<ChartOptions>;
  public chartEnergyOptions: Partial<ChartOptions>;
  public chartIOptions: Partial<ChartOptions>;
  public chartPOptions: Partial<ChartOptions>;
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
  };

  constructor(private cd: ChangeDetectorRef) {

    this.chartVoltageOptions = {
      title: {
        text: "Napięcie dla danej próbki"
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
        title: {
          text: "Napięcie [V]"
        },
        min: 80,
        max: 260,
        tickAmount: 0.1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartCurrentOptions = {
      title: {
        text: "Natężenie prądu dla danej próbki"
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
        title: {
          text: "Natężenie prądu [A]"
        },
        min: 0,
        max: 10,
        tickAmount: 0.001,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartPowerOptions = {
      title: {
        text: "Moc czynna dla danej próbki"
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
        title: {
          text: "Moc [W]"
        },
        min: 0,
        max: 8.8,
        tickAmount: 0.1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartEnergyOptions = {
      title: {
        text: "Energia czynna dla danej próbki"
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
        title: {
          text: "Energia czynna [Wh]"
        },
        min: 0,
        // max: 2,
        tickAmount: 0.01,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartBrightnessOptions = {
      title: {
        text: "Jasność żarówki dla danej próbki"
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
        title: {
          text: "Jasność żarówki[%]"
        },
        min: 0,
        max: 100,
        tickAmount: 1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartTemperatureOptions = {
      title: {
        text: "Temperatura światła dla danej próbki"
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
        title: {
          text: "Temperatura światła [K]"
        },
        min: 2501,
        max: 6519,
        tickAmount: 1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };


    this.chartSaturationOptions = {
      title: {
        text: "Nasycenie światła dla danej próbki"
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
        title: {
          text: "Nasycenie [%]"
        },
        min: 0,
        max: 100,
        tickAmount: 1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartHueOptions = {
      title: {
        text: "Odcień światła dla danej próbki"
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
        title: {
          text: "Odcień RGB"
        },
        min: 0,
        max: 255,
        tickAmount: 1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        title: {
          text: "Numer próbki [n]"
        }
      }
    };

    this.chartIOptions = {
      title: {
        text: this.titleI
      },
      series: [
        {
          name: "I",
          data: this.I
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
        title: {
          text: "Natężenie prądu [A]"
        },
        min: 0,
        max: 10,
        tickAmount: 0.001,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        categories: this.xAxisData, // Tablica wartości dla osi X
        title: {
          text: this.titleXAxis
        },
        labels: {
          rotate: -45, // Rotacja etykiet osi X, jeśli są długie
          style: {
            fontSize: "12px", // Rozmiar czcionki etykiet
            fontFamily: "Arial, sans-serif" // Czcionka etykiet
          }
        },
        tickPlacement: "on", // Znaczniki osi X na danych
        axisBorder: {
          show: true, // Widoczność linii osi X
        },
        axisTicks: {
          show: true // Widoczność znaczników osi X
        }
      }
      
    };

    this.chartPOptions = {
      title: {
        text: this.titleI
      },
      series: [
        {
          name: "I",
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
        title: {
          text: "Moc czynna [W]"
        },
        min: 0,
        max: 8.8,
        tickAmount: 0.1,
        labels: {
          minWidth: 40
        }
      },
      xaxis: {
        categories: this.parametersTab.temperature, // Tablica wartości dla osi X
        title: {
          text: this.titleXAxis
        },
        labels: {
          rotate: -45, // Rotacja etykiet osi X, jeśli są długie
          style: {
            fontSize: "12px", // Rozmiar czcionki etykiet
            fontFamily: "Arial, sans-serif" // Czcionka etykiet
          }
        },
        tickPlacement: "on", // Znaczniki osi X na danych
        axisBorder: {
          show: true, // Widoczność linii osi X
        },
        axisTicks: {
          show: true // Widoczność znaczników osi X
        }
      }
    };
  }
}

