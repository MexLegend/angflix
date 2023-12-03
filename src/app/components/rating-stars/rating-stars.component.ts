import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStarsModule } from 'ngx-stars';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule, NgxStarsModule],
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent {
  @Input() initialStars: number = 0;
  @Input() animation: boolean = false;
  @Input() animationSpeed: number = 500;
  @Input() readonly: boolean = true;
  @Input() wholeStars: boolean = true;
  @Input() size: number = 1;
  @Input() color: string = '#f6bcff';
}
