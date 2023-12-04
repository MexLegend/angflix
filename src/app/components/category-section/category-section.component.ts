import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { MovieCardComponent } from 'src/app/components/movie-card/movie-card.component';
import { MovieFiltersComponent } from '../movie-filters/movie-filters.component';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, MovieFiltersComponent],
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent {
  @Input() title: string = '';
  @Input() movies!: WritableSignal<Movie[]>;
  @Input() showSortSelect: boolean = false;
}
