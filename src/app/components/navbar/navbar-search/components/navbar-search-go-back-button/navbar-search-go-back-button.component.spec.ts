import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSearchGoBackButtonComponent } from './navbar-search-go-back-button.component';

describe('NavbarSearchGoBackButtonComponent', () => {
  let component: NavbarSearchGoBackButtonComponent;
  let fixture: ComponentFixture<NavbarSearchGoBackButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarSearchGoBackButtonComponent]
    });
    fixture = TestBed.createComponent(NavbarSearchGoBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
