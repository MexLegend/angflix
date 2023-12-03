import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarDirection } from '../navbar-links/navbar-links.component';

@Component({
  selector: 'app-navbar-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.scss'],
})
export class NavbarLinkComponent {
  @Input() index!: number;
  @Input() routerLink: string = '';
  @Input() label: string = '';
  @Input() activeRoute: string = '';
  @Input() direction!: NavbarDirection;
  @Input() isOpen?: WritableSignal<boolean>;

  handleSetOpen() {
    if (this.direction === 'Vertical') this.isOpen?.set(!this.isOpen());
  }
}
