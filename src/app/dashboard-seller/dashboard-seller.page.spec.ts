import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSellerPage } from './dashboard-seller.page';

describe('DashboardSellerPage', () => {
  let component: DashboardSellerPage;
  let fixture: ComponentFixture<DashboardSellerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
