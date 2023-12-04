import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-menu-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-menu-button.component.html',
  styleUrls: ['./navbar-menu-button.component.scss'],
})
export class NavbarMenuButtonComponent {
  @Input() isNavbarMenuOpen!: WritableSignal<boolean>;

  handleShowNavbarMenu() {
    this.isNavbarMenuOpen.set(!this.isNavbarMenuOpen());
  }
}
