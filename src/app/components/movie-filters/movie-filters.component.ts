import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMovieFilter } from 'src/app/interfaces/movie-filter';
import { movieFilters } from 'src/app/mocks/movieFilters';
import { IMovie } from '../../interfaces/movie';
import { compareValues } from '../helpers/compareValues';

@Component({
  selector: 'app-movie-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-filters.component.html',
  styleUrls: ['./movie-filters.component.scss'],
})
export class MovieFiltersComponent implements OnInit {
  @Input() moviesList!: ReadonlyArray<IMovie>;
  @Output() emitSortedMovies: EventEmitter<IMovie[]> = new EventEmitter();

  movieFilters: IMovieFilter[] = movieFilters;
  sortForm!: FormGroup;

  private readonly _fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initSortForm();
  }

  initSortForm() {
    this.sortForm = this._fb.group({
      sort: '',
    });
  }

  handleFilter() {
    const {
      sort: { value, asc },
    }: { sort: IMovieFilter } = this.sortForm.value;
    const sortValue = value as keyof IMovie;

    const moviesListCopy = [...this.moviesList];

    moviesListCopy.sort((a, b) =>
      asc
        ? compareValues(a[sortValue], b[sortValue])
        : compareValues(b[sortValue], a[sortValue])
    );

    this.emitSortedMovies.emit(moviesListCopy);
  }
}
