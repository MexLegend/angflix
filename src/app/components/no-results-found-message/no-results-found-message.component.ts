import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-results-found-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-results-found-message.component.html',
  styleUrls: ['./no-results-found-message.component.scss'],
})
export class NoResultsFoundMessageComponent {
  @Input() title?: string = '';
  @Input() subtitle: string = '';
}
