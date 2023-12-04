import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('searchButton') searchButton!: ElementRef;
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, public router: Router) {
    this.initSearchForm();
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
}
