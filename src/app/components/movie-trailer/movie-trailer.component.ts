import { Component, Input, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-movie-trailer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.scss'],
})
export class MovieTrailerComponent {
  @Input() movie!: Movie;
  @Input() expanded: boolean = false;
  @Input() autoplay: boolean = false;
  @Input() loop: boolean = false;
  @Input() mute: boolean = false;
  @Input() controls: boolean = true;

  youtubeMovieTrailerUrl: Signal<SafeResourceUrl> = computed(() =>
    this.getYouTubeMovieTrailerUrl()
  );

  constructor(private sanitizer: DomSanitizer) {}

  getYouTubeMovieTrailerUrl(): SafeResourceUrl {
    const videoId = this.getYouTubeMovieTrailerId();
    const enableAutoPlay = this.autoplay ? 1 : 0;
    const enableMute = this.mute ? 1 : 0;
    const enableLoop = this.loop ? 1 : 0;
    const enableControls = this.controls ? 1 : 0;
    if (videoId) {
      const url = `https://www.youtube.com/embed/${videoId}?autoplay=${enableAutoPlay}&mute=${enableMute}&loop=${enableLoop}&playlist=${videoId}&controls=${enableControls}&modestbranding=0&showinfo=0`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
  }

  getYouTubeMovieTrailerId(): string {
    const videoIdMatch = this.movie.trailerLink.match(
      /(?:\/|v=)([a-zA-Z0-9_-]{11})/
    );
    if (videoIdMatch && videoIdMatch.length > 1) {
      return videoIdMatch[1];
    }
    return '';
  }
}
