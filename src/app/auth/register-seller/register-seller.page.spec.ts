import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterSellerPage } from './register-seller.page';

describe('RegisterSellerPage', () => {
  let component: RegisterSellerPage;
  let fixture: ComponentFixture<RegisterSellerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
