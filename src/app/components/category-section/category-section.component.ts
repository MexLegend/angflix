import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovie } from 'src/app/interfaces/movie';
import { MovieCardComponent } from 'src/app/components/movie-card/movie-card.component';
import { MovieFiltersComponent } from '../movie-filters/movie-filters.component';
import { FadeInDirective } from 'src/app/directives/fade-in.directive';
import { SkeletonMovieCardComponent } from '../skeleton-movie-card/skeleton-movie-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
	selector: 'app-category-section',
	standalone: true,
	imports: [
		CommonModule,
		MovieCardComponent,
		SkeletonMovieCardComponent,
		MovieFiltersComponent,
		FadeInDirective,
		NgxSkeletonLoaderModule
	],
	templateUrl: './category-section.component.html',
	styleUrls: ['./category-section.component.scss']
})
export class CategorySectionComponent {
	@Input() title: string = '';
	@Input({ required: true }) movies!: ReadonlyArray<IMovie>;
	@Input() isLoading: boolean = false;
	@Input() showSortSelect: boolean = false;

	dummyMoviesList = new Array<string>(5).fill('');
}
