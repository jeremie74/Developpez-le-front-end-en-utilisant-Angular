import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { parseRouteParam } from 'src/app/core/utils/route-param.util';
import { RouterLink } from '@angular/router';
import { LineChartComponent } from 'src/app/charts/pie-chart/line-chart.component';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  standalone: true,
  imports: [RouterLink, LineChartComponent],
})
export class CountryDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  loader = inject(LoaderService);
  olympicService = inject(OlympicService);

  countryIdParam = parseRouteParam(this.activatedRoute.snapshot.params['id'], 'number');
  countryName = this.olympicService.getCountryNameById(this.countryIdParam)();

  entries = computed(() => this.olympicService.getEntriesByCountryId(this.countryIdParam)());
  medals = computed(() => this.olympicService.getTotalMedalsByCountryId(this.countryIdParam)());
  athletes = computed(() => this.olympicService.getTotalAthletesByCountryId(this.countryIdParam)());

  ngOnInit() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 1000);
  }
}
