import { Component, computed, effect, inject } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { OlympicService } from 'src/app/core/services/olympic.service';
import type { ECElementEvent, EChartsOption } from 'echarts';

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
  onChartClick($event: ECElementEvent) {
    console.log('Chart clicked:', $event);
  }

  olympicService = inject(OlympicService);

  readonly getChartData = computed(() => {
    const data = this.olympicService.medalsByCountry(); // ← on appelle le signal
    return data.map(c => ({
      value: c.totalMedals,
      name: c.country,
      id: c.id,
    }));
  });

  readonly chartOptions = computed((): EChartsOption => {
    const chartData = this.getChartData(); // 👈 on appelle le signal ici

    return {
      textStyle: {
        fontSize: 16,
        color: '#333',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `
              <div style="font-weight: bold; color: ${params.color};">${params.name}</div>
              <div style="font-weight: bold;">${params.value}</div>`;
        },
      },
      series: [
        {
          name: 'Médailles par pays',
          type: 'pie',
          radius: '70%',
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
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{b}',
          },
        },
      ],
    };
  });
}
