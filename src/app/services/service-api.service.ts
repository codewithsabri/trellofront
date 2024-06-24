import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }


  fetchDataForPage(url: string) {
    // Determine the API endpoint based on the pagePath
    // This is a simplified example. Adjust the logic as needed.
    const apiUrl = `http://localhost:3000/projects`;
    return this.http.get(apiUrl);
  }

  
}

