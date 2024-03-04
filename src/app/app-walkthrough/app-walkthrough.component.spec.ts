import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWalkthroughComponent } from './app-walkthrough.component';

describe('AppWalkthroughComponent', () => {
  let component: AppWalkthroughComponent;
  let fixture: ComponentFixture<AppWalkthroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppWalkthroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppWalkthroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
