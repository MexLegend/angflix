import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { WatchlistService } from 'src/app/services/watchlist.service';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { CategorySectionComponent } from 'src/app/components/category-section/category-section.component';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [CommonModule, ContainerComponent, CategorySectionComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.scss'],
})
export class WatchlistPageComponent {
  watchList: WritableSignal<Movie[]> = signal([]);

  constructor(private watchlistService: WatchlistService) {
    this.watchList = this.watchlistService.getWatchList();
  }
}
