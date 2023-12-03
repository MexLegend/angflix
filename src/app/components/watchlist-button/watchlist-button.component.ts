import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist-button.component.html',
  styleUrls: ['./watchlist-button.component.scss'],
})
export class WatchlistButtonComponent {
  toogleMovieWatchList(event: MouseEvent) {
    event.stopPropagation();
  }
}
