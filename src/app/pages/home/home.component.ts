import { Component, inject } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartComponent } from './../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
olympicService = inject(OlympicService);

}
