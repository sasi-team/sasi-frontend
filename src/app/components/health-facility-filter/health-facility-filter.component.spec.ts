import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthFacilityFilterComponent } from './health-facility-filter.component';

describe('HealthFacilityFilterComponent', () => {
  let component: HealthFacilityFilterComponent;
  let fixture: ComponentFixture<HealthFacilityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthFacilityFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthFacilityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
