import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, catchError, tap } from 'rxjs/operators';

interface Project {
  // Define the properties of the Todo type here
}

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService { // Corrected class name
  private projects$: Observable<Project[]> = of([]); // Changed variable name and type to match projects context
  private dataFetched: boolean = false;
  private projects: Project[] = []; // Changed comment and variable name to match projects context

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> { // Corrected method name
    if (!this.dataFetched) {
      this.projects$ = this.http.get<Project[]>('https://jsonplaceholder.typicode.com/todos?_limit=5').pipe( // Changed URL and limit to match projects context
        shareReplay(1),
        catchError(error => {
          console.error('HTTP error occurred', error);
          return of([]);
        }),
        tap((projects: Project[]) => this.projects = projects) // Corrected parameter type and variable name
      );
      this.dataFetched = true;
    }
    return this.projects$;
  }
}