import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { NavLink } from 'src/app/interfaces/navlink';
import { navlinks } from 'src/app/mocks/navlinks';

export type NavbarDirection = 'Vertical' | 'Horizontal';

@Component({
  selector: 'app-navbar-links',
  standalone: true,
  imports: [CommonModule, NavbarLinkComponent],
  templateUrl: './navbar-links.component.html',
  styleUrls: ['./navbar-links.component.scss'],
})
export class NavbarLinksComponent {
  @Input() direction: NavbarDirection = 'Horizontal';
  @Input() activeRoute: string = '';
  @Input() isOpen?: WritableSignal<boolean>;
  @Input() hideOnMobile: boolean = true;

  publicNavLinks: NavLink[] = navlinks;
}
