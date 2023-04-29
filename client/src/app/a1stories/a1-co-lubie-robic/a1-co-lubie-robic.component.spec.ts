import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A1CoLubieRobicComponent } from './a1-co-lubie-robic.component';

describe('A1CoLubieRobicComponent', () => {
  let component: A1CoLubieRobicComponent;
  let fixture: ComponentFixture<A1CoLubieRobicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A1CoLubieRobicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A1CoLubieRobicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
