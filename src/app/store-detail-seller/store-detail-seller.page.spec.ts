import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreDetailSellerPage } from './store-detail-seller.page';

describe('StoreDetailSellerPage', () => {
  let component: StoreDetailSellerPage;
  let fixture: ComponentFixture<StoreDetailSellerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailSellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
