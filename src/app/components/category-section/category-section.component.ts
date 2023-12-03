import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from 'src/app/interfaces/movie';
import { MovieCardComponent } from 'src/app/components/movie-card/movie-card.component';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss'],
})
export class CategorySectionComponent {
  @Input() title: string = '';
  @Input() movies: Movie[] = [];
}
