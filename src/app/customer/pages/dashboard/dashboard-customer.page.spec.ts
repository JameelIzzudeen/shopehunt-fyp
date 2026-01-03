import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardCustomerPage } from './dashboard-customer.page';

describe('DashboardCustomerPage', () => {
  let component: DashboardCustomerPage;
  let fixture: ComponentFixture<DashboardCustomerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
