import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigatePage } from './navigate.page';

describe('NavigatePage', () => {
  let component: NavigatePage;
  let fixture: ComponentFixture<NavigatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
