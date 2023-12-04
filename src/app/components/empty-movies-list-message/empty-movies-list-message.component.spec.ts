import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyMoviesListMessageComponent } from './empty-movies-list-message.component';

describe('EmptyMoviesListMessageComponent', () => {
  let component: EmptyMoviesListMessageComponent;
  let fixture: ComponentFixture<EmptyMoviesListMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyMoviesListMessageComponent]
    });
    fixture = TestBed.createComponent(EmptyMoviesListMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
