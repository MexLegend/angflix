import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFiltersComponent } from './movie-filters.component';

describe('MovieFiltersComponent', () => {
  let component: MovieFiltersComponent;
  let fixture: ComponentFixture<MovieFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieFiltersComponent]
    });
    fixture = TestBed.createComponent(MovieFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
