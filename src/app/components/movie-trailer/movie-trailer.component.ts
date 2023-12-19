import { Component, Input, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMovie } from 'src/app/interfaces/movie';

@Component({
	selector: 'app-movie-trailer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-trailer.component.html',
	styleUrls: ['./movie-trailer.component.scss']
})
export class MovieTrailerComponent {
	@Input() movie!: IMovie | null;
	@Input() expanded: boolean = false;
	@Input() autoplay: boolean = false;
	@Input() loop: boolean = false;
	@Input() mute: boolean = false;
	@Input() controls: boolean = true;

	youtubeMovieTrailerUrl: Signal<SafeResourceUrl> = computed(() => this.getYouTubeMovieTrailerUrl());

	private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);

	/**
	 * Retrieves the secure YouTube movie trailer URL with configurable options.
	 * @returns Secure URL of the YouTube movie trailer with playback options.
	 */
	getYouTubeMovieTrailerUrl(): SafeResourceUrl {
		const videoId = this.getYouTubeMovieTrailerId();
		const enableAutoPlay = this.autoplay ? 1 : 0;
		const enableMute = this.mute ? 1 : 0;
		const enableLoop = this.loop ? 1 : 0;
		const enableControls = this.controls ? 1 : 0;
		if (videoId) {
			const url = `https://www.youtube.com/embed/${videoId}?autoplay=${enableAutoPlay}&mute=${enableMute}&loop=${enableLoop}&playlist=${videoId}&controls=${enableControls}&modestbranding=0&showinfo=0`;
			return this._sanitizer.bypassSecurityTrustResourceUrl(url);
		}
		return '';
	}

	/**
	 * Retrieves the ID of the YouTube movie trailer video from the provided link.
	 * @returns ID of the YouTube movie trailer video.
	 */
	getYouTubeMovieTrailerId(): string {
		const videoIdMatch = this.movie?.title.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
		if (videoIdMatch && videoIdMatch.length > 1) {
			return videoIdMatch[1];
		}
		return '';
	}
}
