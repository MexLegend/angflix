import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss'],
})
export class MovieFiltersComponent {
  @Input() moviesList!: WritableSignal<Movie[]>;
}
