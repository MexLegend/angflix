import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-search-go-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-search-go-back-button.component.html',
  styleUrls: ['./navbar-search-go-back-button.component.scss'],
})
export class NavbarSearchGoBackButtonComponent {
  @Input() isFloatingSearch!: WritableSignal<boolean>;

  toogleFloatingSearch() {
    this.isFloatingSearch.set(!this.isFloatingSearch());
  }
}
