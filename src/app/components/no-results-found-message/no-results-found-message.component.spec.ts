import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultsFoundMessageComponent } from './no-results-found-message.component';

describe('NoResultsFoundMessageComponent', () => {
  let component: NoResultsFoundMessageComponent;
  let fixture: ComponentFixture<NoResultsFoundMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoResultsFoundMessageComponent]
    });
    fixture = TestBed.createComponent(NoResultsFoundMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
