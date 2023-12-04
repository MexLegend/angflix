// Core Imports
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// External Imports
import { Subscription } from 'rxjs';

import { ContainerComponent } from '../container/container.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarLinksComponent } from './navbar-links/navbar-links.component';
import { LogoComponent } from '../logo/logo.component';
import { NavbarSearchComponent } from './navbar-search/navbar-search.component';
import { NavbarMenuButtonComponent } from '../navbar-menu-button/navbar-menu-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContainerComponent,
    NavbarLinksComponent,
    NavbarMenuComponent,
    LogoComponent,
    NavbarSearchComponent,
    NavbarMenuButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('navbar', { static: false }) navbar?: ElementRef<HTMLElement>;

  routerEventsSub$?: Subscription;

  isScrolling: boolean = false;
  isNavbarMenuOpen: WritableSignal<boolean> = signal(false);

  constructor(public router: Router, public route: ActivatedRoute) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const navbarElement = this.navbar?.nativeElement;
    if (!navbarElement) return;

    if (window.scrollY > navbarElement.clientHeight) {
      this.isScrolling = true;
    } else {
      this.isScrolling = false;
    }
  }

  // Unsubscribe Any Subscription
  ngOnDestroy() {
    this.routerEventsSub$?.unsubscribe();
  }
}
