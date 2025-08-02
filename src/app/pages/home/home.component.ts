import { Component, inject, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { PieChartComponent } from './../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PieChartComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loader = inject(LoaderService);
  olympicService = inject(OlympicService);

  ngOnInit() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 1000);
  }
}
