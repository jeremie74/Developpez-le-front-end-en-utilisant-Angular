import { Component, computed, inject, Input } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { type EChartsOption } from 'echarts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEcharts()],
  template: ` <div echarts [options]="chartOptions()" class="line-chart-container"></div> `,
  styles: [
    `
      .line-chart-container {
        width: 100%;
        height: 400px;
      }
    `,
  ],
})
export class LineChartComponent {
  olympicService = inject(OlympicService);
  @Input() countryId!: number;

  readonly getChartData = computed(() => {
    const history = this.olympicService.getMedalsHistoryByCountryId(this.countryId)();

    return {
      years: history.map((h: { year: number; totalMedals: number }) => h.year),
      medals: history.map((h: { year: number; totalMedals: number }) => h.totalMedals),
    };
  });

  readonly chartOptions = computed((): EChartsOption => {
    const data = this.getChartData();

    return {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: data.years,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.medals,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#39818d',
            width: 3,
          },
          itemStyle: {
            color: '#39818d',
            borderColor: '#fff',
            borderWidth: 2,
          },
          areaStyle: {
            color: 'rgba(57, 129, 141, 0.2)',
          },
        },
      ],
    };
  });
}
