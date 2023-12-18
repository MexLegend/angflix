import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMovieCardComponent } from './skeleton-movie-card.component';

describe('SkeletonMovieCardComponent', () => {
  let component: SkeletonMovieCardComponent;
  let fixture: ComponentFixture<SkeletonMovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkeletonMovieCardComponent]
    });
    fixture = TestBed.createComponent(SkeletonMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
