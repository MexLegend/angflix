import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-navbar-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './navbar-search.component.html',
  styleUrls: ['./navbar-search.component.scss'],
})
export class NavbarSearchComponent {
  @Input() isFloatingSearch: WritableSignal<boolean> = signal(false);

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchButton') searchButton!: ElementRef;

  searchForm!: FormGroup;
  isMobile: WritableSignal<boolean> = signal(
    window.matchMedia('(max-width: 768px)').matches
  );

  constructor(private fb: FormBuilder, public router: Router) {
    this.initSearchForm();
  }

  /**
   * Listens to the window resize event and adjusts the component's behavior accordingly.
   */
  @HostListener('window:resize', [])
  onResize() {
    // Check if the window width matches mobile size (less than or equal to 768px)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // If it's not a mobile view and the component is in floating search mode, toggle the search to non-floating mode.
    if (!isMobile && this.isFloatingSearch()) this.toogleFloatingSearch();

    // Set the isMobile Signal to reflect the current window size.
    this.isMobile.set(isMobile);
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      search: [null, Validators.required],
    });
  }

  /**
   * Handles the form submission triggered by submitting the search form.
   * Stops the event propagation, validates the search form, and navigates to the '/search' route with query params if the form is valid.
   * Clears the form input, removes focus from the input and button elements after navigation, or sets focus on the input if the form is invalid.
   * @param event - The event object triggered by submitting the form.
   */
  handleSubmit(event: SubmitEvent) {
    event.stopPropagation();
    if (this.searchForm.valid) {
      this.router.navigate(['/search'], {
        queryParams: { search: this.searchForm.value.search },
        queryParamsHandling: 'merge',
      });
      this.searchInput.nativeElement.blur();
      this.searchButton.nativeElement.blur();
      this.searchForm.reset();
    } else this.searchInput.nativeElement.focus();
  }

  toogleFloatingSearch() {
    this.isFloatingSearch.set(!this.isFloatingSearch());
  }
}
