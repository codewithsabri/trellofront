import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchDataForPage(pagePath: string) {
    // Determine the API endpoint based on the pagePath
    // This is a simplified example. Adjust the logic as needed.
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/`;
    return this.http.get(apiUrl);
  }
}