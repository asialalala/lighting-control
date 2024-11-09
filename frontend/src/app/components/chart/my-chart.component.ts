import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Parameters } from '../../models/parameters';

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
  imports: [ NgApexchartsModule ],
  templateUrl: './my-chart.component.html',
  styleUrl: './my-chart.component.css'
})
export class MyChartComponent implements OnChanges{
  @ViewChild("chart") chart: ChartComponent | undefined;

  @Input() parameters!: Parameters;

  voltage: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  current: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  power: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  brightness: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  temperature: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  hue: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  saturation: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];
  value: number[] = [1,1,1,1,1,1,1,2,2,2,3,3,3,3];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parameters']) {
      console.log('Zmiana w parameters:', changes['parameters'].currentValue);
    }
  }
  
  public chart1options: Partial<ChartOptions>;
  public chart2options: Partial<ChartOptions>;
  public chart3options: Partial<ChartOptions>;
  public chart4options: Partial<ChartOptions>;
  public chart5options: Partial<ChartOptions>;
  public chart6options: Partial<ChartOptions>;
  public chart7options: Partial<ChartOptions>;
  public chart8options: Partial<ChartOptions>;
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
          formatter: function() {
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
    console.log("Data ", this.generateDayWiseTimeSeries(
      new Date("11 Feb 2017").getTime(),
      20,
      {
        min: 10,
        max: 60
      }
    ))
    this.chart1options = {
      title : {
        text : "Napięcie"
      },
      series: [
        {
          name: "chart1",
          data: this.voltage
        }
      ],
      chart: {
        id: "fb",
        group: "social",
        type: "line",
        height: 300
      },
      colors: ["#008FFB"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart2options = {
      title : {
        text : "Zużycie prądu"
      },
      series: [
        {
          name: "chart2",
          data: this.current
        }
      ],
      chart: {
        id: "tw",
        group: "social",
        type: "line",
        height: 300
      },
      colors: ["#546E7A"],
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart3options = {
      title : {
        text : "Zużycie mocy"
      },
      series: [
        {
          name: "chart3",
          data: this.power
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart4options = {
      title : {
        text : "Jasność żarówki"
      },
      series: [
        {
          name: "chart4",
          data: this.brightness
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };

    this.chart5options = {
      title : {
        text : "Temperatura światła"
      },
      series: [
        {
          name: "chart3",
          data: this.temperature
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chart6options = {
      title : {
        text : "Wartość światła"
      },
      series: [
        {
          name: "chart3",
          data: this.value
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chart7options = {
      title : {
        text : "Nasycenie światła"
      },
      series: [
        {
          name: "chart3",
          data: this.saturation
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
    this.chart8options = {
      title : {
        text : "Odcień światła"
      },
      series: [
        {
          name: "chart3",
          data: this.hue
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
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      }
    };
  }


  public generateDayWiseTimeSeries(baseval : number, count : number, yrange : {min : number, max : number}): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}

