import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomRangeComponent } from './zoom-range.component';

describe('ZoomRangeComponent', () => {
  let component: ZoomRangeComponent;
  let fixture: ComponentFixture<ZoomRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
