import { Component, Input, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMovie } from 'src/app/interfaces/movie';
import { environment } from 'src/environments/environment.development';

@Component({
	selector: 'app-movie-trailer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './movie-trailer.component.html',
	styleUrls: ['./movie-trailer.component.scss']
})
export class MovieTrailerComponent implements OnInit {
	@Input({ required: true }) movie!: IMovie;
	@Input() expanded: boolean = false;
	@Input() autoplay: boolean = false;
	@Input() loop: boolean = false;
	@Input() mute: boolean = false;
	@Input() controls: boolean = true;

	isLoadingTrailer: WritableSignal<boolean> = signal(true);
	youtubeMovieTrailerUrl: WritableSignal<SafeResourceUrl> = signal('');
	movieThumbnail!: Signal<string>;

	private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);

	ngOnInit(): void {
		this.getYouTubeMovieTrailerUrl();
		this.movieThumbnail = computed(
			() => `${environment.MOVIES_IMAGES_ENDPOINT}/t/p/original/${this.movie?.poster_path}`
		);
	}

	/**
	 * Retrieves the secure YouTube movie trailer URL with configurable options.
	 * @returns Secure URL of the YouTube movie trailer with playback options.
	 */
	async getYouTubeMovieTrailerUrl(): Promise<void> {
		const videoId = await this.getYoutubeMovieTrailerId();

		const enableAutoPlay = this.autoplay ? 1 : 0;
		const enableMute = this.mute ? 1 : 0;
		const enableLoop = this.loop ? 1 : 0;
		const enableControls = this.controls ? 1 : 0;
		if (videoId) {
			const url = `https://www.youtube.com/embed/${videoId}?autoplay=${enableAutoPlay}&mute=${enableMute}&loop=${enableLoop}&playlist=${videoId}&controls=${enableControls}&modestbranding=0&showinfo=0`;
			const trailerURL = this._sanitizer.bypassSecurityTrustResourceUrl(url);
			this.youtubeMovieTrailerUrl.set(trailerURL);
		}
		this.isLoadingTrailer.set(false);
	}

	/**
	 * Retrieves the ID of the YouTube movie trailer video from the provided link.
	 * @returns ID of the YouTube movie trailer video.
	 */
	async getYoutubeMovieTrailerId(): Promise<string> {
		const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${environment.YOUTUBE_API_KEY}&q=${this.movie?.title}+trailer`;

		try {
			const response = await fetch(youtubeApiUrl);
			const result = await response.json();
			const trailerVideoId = result.items[0].id.videoId;
			return trailerVideoId as string;
		} catch (error) {
			console.error('Error fetching trailer from YouTube:', error);
			return '';
		}
	}
}
