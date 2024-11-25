import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthFacilityMapComponent } from './health-facility-map.component';

describe('HealthFacilityMapComponent', () => {
  let component: HealthFacilityMapComponent;
  let fixture: ComponentFixture<HealthFacilityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthFacilityMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthFacilityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
