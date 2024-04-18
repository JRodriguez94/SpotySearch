import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss']
})
export class ArtistProfileComponent {
  @Input() artist: any;
}
