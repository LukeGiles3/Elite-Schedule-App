import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface Tournament {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class EliteApiService {

  currentTourney: any = [];

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${ environment.firebaseBaseUrl }/tournaments.json`);
}

getTournamentData(tourneyId): Observable<any> {
  return this.http.get(`${ environment.firebaseBaseUrl }/tournaments-data/${ tourneyId }.json`)
      .pipe(
map((response) => {
              this.currentTourney = response;
              return this.currentTourney;
          })
      );
}

getCurrentTourney() {
  return this.currentTourney;
}
}
