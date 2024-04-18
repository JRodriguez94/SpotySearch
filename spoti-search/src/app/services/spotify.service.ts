// spotify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private baseUrl = 'http://localhost:3000/search/artists'; // Asegúrate de que esto coincida con la URL de tu servidor Node.js

  constructor(private http: HttpClient) {}

  searchArtists(artistName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?name=${encodeURIComponent(artistName)}`);
  }
}
