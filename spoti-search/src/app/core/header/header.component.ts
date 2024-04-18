import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Importar HttpClientModule
import { SpotifyService } from '../../services/spotify.service';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],  // Añadir HttpClientModule aquí
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchQuery = '';
  searchResults: any[] = [];
  searchSubject = new Subject<string>();

  @Output() artistSelected = new EventEmitter<any>();

  constructor(private spotifyService: SpotifyService) {
    this.searchSubject.pipe(
      filter(query => query.length > 3), // Solo buscar si la longitud del query es mayor a 3
      debounceTime(300), // Esperar 300ms para evitar búsquedas innecesarias
      switchMap(query => this.spotifyService.searchArtists(query)) // Cambiar a búsqueda de artistas
    ).subscribe(results => {
      console.log('results: ', results);
      this.searchResults = results;
    });
  }

  search(): void {
    this.searchSubject.next(this.searchQuery);
  }

  selectArtist(artist: any): void {
    this.artistSelected.emit(artist);
    this.searchResults = []; // Limpiar resultados después de seleccionar un artista
    this.searchQuery = ''; // Limpiar la barra de búsqueda
  }
}
