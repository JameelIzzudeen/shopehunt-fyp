import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSellersPage } from './admin-sellers.page';

describe('AdminSellersPage', () => {
  let component: AdminSellersPage;
  let fixture: ComponentFixture<AdminSellersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
