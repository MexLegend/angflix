import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details-tag.component.html',
  styleUrls: ['./movie-details-tag.component.scss'],
})
export class MovieDetailsTagComponent {
  @Input() label!: string;
  @Input() description!: string;
}
