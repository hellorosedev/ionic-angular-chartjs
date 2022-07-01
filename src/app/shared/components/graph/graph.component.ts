import { Component, ViewChild, ElementRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent {
  @Input() rates!: any;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;

  constructor () {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  private getDate(): any[] {
    return this.rates.map(item => item.date);
  }

  private getRates(): any[] {
    return this.rates.map(item => item.rate);
  }

  private lineChartMethod(): void {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.getDate(),
        datasets: [
          {
            label: 'Currency Rate',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.getRates(),
            spanGaps: false,
          }
        ]
      }
    });
  };

}
