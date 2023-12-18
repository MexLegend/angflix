import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IMovie } from 'src/app/interfaces/movie';

@Component({
	selector: 'app-play-button',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './play-button.component.html',
	styleUrls: ['./play-button.component.scss']
})
export class PlayButtonComponent {
	@Input() movie!: IMovie;
	@Input() showLabel: boolean = true;
}
