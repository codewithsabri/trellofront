import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService {
  private projects$: Observable<Project[]> = of([]);
  private dataFetched: boolean = false;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (!this.dataFetched) {
      this.projects$ = this.http.get<Project[]>('https://trellobackendupdate.azurewebsites.net/api/project').pipe(
        shareReplay(1),
        catchError(error => {
          console.error('HTTP error occurred', error);
          return of([]);
        })
      );
      this.dataFetched = true;
    }
    return this.projects$;
  }
}