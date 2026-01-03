import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendStorePage } from './recommend-store.page';

describe('RecommendStorePage', () => {
  let component: RecommendStorePage;
  let fixture: ComponentFixture<RecommendStorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
