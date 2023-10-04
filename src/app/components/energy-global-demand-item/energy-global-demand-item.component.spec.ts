import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyGlobalDemandItemComponent } from './energy-global-demand-item.component';

describe('EnergyGlobalDemandItemComponent', () => {
  let component: EnergyGlobalDemandItemComponent;
  let fixture: ComponentFixture<EnergyGlobalDemandItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyGlobalDemandItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyGlobalDemandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
