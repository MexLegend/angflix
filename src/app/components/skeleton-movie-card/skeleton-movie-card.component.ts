import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
	selector: 'app-skeleton-movie-card',
	standalone: true,
	imports: [CommonModule, NgxSkeletonLoaderModule],
	templateUrl: './skeleton-movie-card.component.html',
	styleUrls: ['./skeleton-movie-card.component.scss']
})
export class SkeletonMovieCardComponent {}
