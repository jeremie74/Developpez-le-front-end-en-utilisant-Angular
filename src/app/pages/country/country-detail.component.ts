import { Component, computed, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class CountryDetailComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  olympicService = inject(OlympicService);
  countryIdParam = parseRouteParam(this.activatedRoute.snapshot.params['id'], 'number');
  countryNameParam = parseRouteParam(this.activatedRoute.snapshot.params['name'], 'string');

  entries = computed(() => this.olympicService.getEntriesByCountryId(this.countryIdParam)());
  medals = computed(() => this.olympicService.getTotalMedalsByCountryId(this.countryIdParam)());
  athletes = computed(() => this.olympicService.getTotalAthletesByCountryId(this.countryIdParam)());
}
