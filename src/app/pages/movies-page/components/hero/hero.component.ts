import {
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { PlayButtonComponent } from '../../../../components/play-button/play-button.component';
import { WatchlistButtonComponent } from '../../../../components/watchlist-button/watchlist-button.component';
import { MovieTrailerComponent } from 'src/app/components/movie-trailer/movie-trailer.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, PlayButtonComponent, WatchlistButtonComponent, MovieTrailerComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @Input() movies!: WritableSignal<Movie[]>;

  randomMovie: Signal<Movie> = computed(() => this.getRandomMovie());

  getRandomMovie(): Movie {
    const moviesCount = this.movies().length;
    const randomIndex = Math.floor(Math.random() * moviesCount);
    console.log({ moviesCount, movie: this.movies()[randomIndex] });

    return this.movies()[randomIndex];
  }
}
