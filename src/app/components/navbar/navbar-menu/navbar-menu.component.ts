import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarLinksComponent } from '../navbar-links/navbar-links.component';
import { navlinks } from '../../../mocks/navlinks';
import { NavLink } from 'src/app/interfaces/navlink';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, NavbarLinksComponent, NavbarLinkComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent {
  @Input() isOpen!: WritableSignal<boolean>;
  @Input() activeRoute: string = '';

  navLinks: NavLink[] = navlinks;
}
