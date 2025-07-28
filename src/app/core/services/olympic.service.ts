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
      catchError((err) => {
        console.error('Erreur lors du chargement des données :', err);
        this.error.set(true);
        return of(null);
      })
    ),
    {
      initialValue: undefined
    }
  );

  constructor(private http: HttpClient) {}

  readonly getOlympics = computed(() => this.olympics());
  
  readonly getTotalParticipations = computed(() => {
    const data = this.getOlympics() ?? [];
    return data[0]?.participations?.length ?? 0;
});

  readonly medalsByCountry = computed(() => {
    return this.getOlympics()?.map(country => {
      const totalMedals = country.participations.reduce(
        (sum, participation) => sum + participation.medalsCount, 0
      );
      return {
        id: country.id,
        country: country.country,
        totalMedals: totalMedals
      };
    }) ?? [];
  });


  readonly hasError = computed(() => this.error());
}
