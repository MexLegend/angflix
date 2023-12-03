import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsTagComponent } from './movie-details-tag.component';

describe('MovieDetailsTagComponent', () => {
  let component: MovieDetailsTagComponent;
  let fixture: ComponentFixture<MovieDetailsTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieDetailsTagComponent]
    });
    fixture = TestBed.createComponent(MovieDetailsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
