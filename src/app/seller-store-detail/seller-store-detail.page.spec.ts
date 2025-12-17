import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerStoreDetailPage } from './seller-store-detail.page';

describe('SellerStoreDetailPage', () => {
  let component: SellerStoreDetailPage;
  let fixture: ComponentFixture<SellerStoreDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerStoreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
