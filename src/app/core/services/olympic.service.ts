import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  private error = signal(false);

  private olympics = toSignal(
    this.http.get<any>(this.olympicUrl).pipe(
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
  readonly hasError = computed(() => this.error());
}
