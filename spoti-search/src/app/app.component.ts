
// app.component.ts
import { Component } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../app/core/header/header.component';
import { ArtistProfileComponent } from './artist/artist-profile/artist-profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    ArtistProfileComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedArtist: any = null;

  onArtistSelected(artist: any): void {
    this.selectedArtist = artist;
  }
}
