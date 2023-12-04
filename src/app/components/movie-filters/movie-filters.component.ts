import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../interfaces/movie';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieFilter } from 'src/app/interfaces/movie-filter';
import { movieFilters } from 'src/app/mocks/movieFilters';
import { compareValues } from '../helpers/compareValues';

@Component({
  selector: 'app-movie-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss'],
})
export class MovieFiltersComponent {
  @Input() moviesList!: WritableSignal<Movie[]>;

  movieFilters: MovieFilter[] = movieFilters;
  sortForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initSortForm();
  }

  initSortForm() {
    this.sortForm = this.fb.group({
      sort: '',
    });
  }

  handleFilter() {
    const {
      sort: { value, asc },
    }: { sort: MovieFilter } = this.sortForm.value;
    const sortValue = value as keyof Movie;

    this.moviesList.update((prevValue) =>
      prevValue.sort((a, b) =>
        asc
          ? compareValues(a[sortValue], b[sortValue])
          : compareValues(b[sortValue], a[sortValue])
      )
    );
  }
}
