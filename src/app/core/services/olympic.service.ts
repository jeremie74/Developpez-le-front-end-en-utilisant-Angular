import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private error = signal(false);

  private olympics = toSignal(
    this.http.get<Olympic[]>(this.olympicUrl).pipe(
      catchError(err => {
        console.error('Error on loading data :', err);
        this.error.set(true);
        return of(null);
      }),
    ),
    {
      initialValue: undefined,
    },
  );

  constructor(private http: HttpClient) {}

  readonly getOlympics = computed(() => this.olympics());

  readonly getTotalParticipations = computed(() => {
    const data = this.getOlympics() ?? [];
    return data[0]?.participations?.length ?? 0;
  });

  readonly medalsByCountry = computed(() => {
    return (
      this.getOlympics()?.map(country => {
        const totalMedals = country.participations.reduce(
          (sum, participation) => sum + participation.medalsCount,
          0,
        );
        return {
          id: country.id,
          country: country.country,
          totalMedals: totalMedals,
        };
      }) ?? []
    );
  });

  private findCountryById(id: number) {
    const data = this.getOlympics() ?? [];
    return data.find(c => c.id === id);
  }

  readonly getEntriesByCountryId = (id: number) =>
    computed(() => {
      const country = this.findCountryById(id);
      return country?.participations.length ?? 0;
    });

  readonly getTotalMedalsByCountryId = (id: number) =>
    computed(() => {
      const country = this.findCountryById(id);
      return country?.participations.reduce((sum, p) => sum + p.medalsCount, 0) ?? 0;
    });

  readonly getTotalAthletesByCountryId = (id: number) =>
    computed(() => {
      const country = this.findCountryById(id);
      return country?.participations.reduce((sum, p) => sum + p.athleteCount, 0) ?? 0;
    });

  readonly getMedalsHistoryByCountryId = (id: number) =>
    computed(() => {
      const country = this.findCountryById(id);
      if (!country) return [];

      return country.participations.map(p => ({
        year: p.year,
        totalMedals: p.medalsCount,
      }));
    });

  readonly hasError = computed(() => this.error());
}
