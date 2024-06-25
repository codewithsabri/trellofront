import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private projectCreatedSource = new Subject<void>();
  projectCreated$ = this.projectCreatedSource.asObservable();
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  projectCreated() {
    this.projectCreatedSource.next();
  }
  fetchDataForPage(url: string) {
    // Determine the API endpoint based on the pagePath
    // This is a simplified example. Adjust the logic as needed.
    const apiUrl = `http://localhost:3000/projects`;
    return this.http.get(apiUrl);
  }

  post(url: string, formData: FormData): Observable<any> {
    return this.http.post(url, formData);
  }

  
}

