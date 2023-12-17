import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from '../../interfaces/movie';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMovieFilter } from 'src/app/interfaces/movie-filter';
import { movieFilters } from 'src/app/mocks/movieFilters';
import { compareValues } from '../helpers/compareValues';

@Component({
	selector: 'app-movie-filters',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './movie-filters.component.html',
	styleUrls: ['./movie-filters.component.scss']
})
export class MovieFiltersComponent implements OnInit {
	@Input() moviesList!: ReadonlyArray<IMovie>;

	movieFilters: IMovieFilter[] = movieFilters;
	sortForm!: FormGroup;

	private readonly _fb: FormBuilder = inject(FormBuilder);

	ngOnInit(): void {
		this.initSortForm();
	}

	initSortForm() {
		this.sortForm = this._fb.group({
			sort: ''
		});
	}

	handleFilter() {
		const {
			sort: { value, asc }
		}: { sort: IMovieFilter } = this.sortForm.value;
		const sortValue = value as keyof IMovie;

		// this.moviesList.update((prevValue) =>
		// 	prevValue.sort((a, b) =>
		// 		asc ? compareValues(a[sortValue], b[sortValue]) : compareValues(b[sortValue], a[sortValue])
		// 	)
		// );
	}
}
