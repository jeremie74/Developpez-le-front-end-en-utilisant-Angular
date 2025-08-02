import { Component, computed, inject } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { OlympicService } from 'src/app/core/services/olympic.service';
import type { ECElementEvent, EChartsOption } from 'echarts';
import type { MedalChartData } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  providers: [provideEcharts()],
  template: `
    <div
      echarts
      [options]="chartOptions()"
      (chartClick)="onChartClick($event)"
      class="pie-chart-container"
    ></div>
  `,
  styles: [
    `
      .pie-chart-container {
        width: 100%;
        height: 400px;
      }
    `,
  ],
})
export class PieChartComponent {
  constructor(private router: Router) {}
  olympicService = inject(OlympicService);

  onChartClick($event: ECElementEvent) {
    const data = $event.data as MedalChartData;
    this.router.navigate(['country', data.id]);
  }

  readonly getChartData = computed(() => {
    const data = this.olympicService.medalsByCountry();
    return data.map(c => ({
      value: c.totalMedals,
      name: c.country,
      id: c.id,
    }));
  });

  readonly chartOptions = computed((): EChartsOption => {
    const chartData = this.getChartData();

    return {
      textStyle: {
        fontSize: 14,
        color: '#333',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `
              <div style="font-weight: bold; color: ${params.color};">${params.name}</div>
              <div style="font-weight: bold; display: flex; align-items: center; gap: 4px;">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     viewBox="0 0 24 24" 
                     fill="currentColor" 
                     style="width: 20px; height: 20px;">
                  <path fill-rule="evenodd" 
                        d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" 
                        clip-rule="evenodd" />
                </svg>
                ${params.value}
              </div>`;
        },
      },
      series: [
        {
          name: 'Médailles par pays',
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          data: chartData.map(item => ({
            value: item.value,
            name: item.name,
            id: item.id,
          })),
          itemStyle: {
            borderRadius: 0,
            borderColor: '#fff',
            borderWidth: 2,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{b}',
            position: 'outside', // par défaut
            fontSize: 14,
            color: '#333',
          },
        },
      ],
      media: [
        {
          query: { maxWidth: 500 },
          option: {
            series: [
              {
                label: {
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff',
                },
              },
            ],
          },
        },
      ],
    };
  });
}
