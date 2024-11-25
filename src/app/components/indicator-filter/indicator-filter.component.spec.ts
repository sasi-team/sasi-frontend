import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorFilterComponent } from './indicator-filter.component';

describe('IndicatorFilterComponent', () => {
  let component: IndicatorFilterComponent;
  let fixture: ComponentFixture<IndicatorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicatorFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
