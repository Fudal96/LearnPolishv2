import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPremiumComponent } from './get-premium.component';

describe('GetPremiumComponent', () => {
  let component: GetPremiumComponent;
  let fixture: ComponentFixture<GetPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPremiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
