import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A1SpacerZPsemComponent } from './a1-spacer-z-psem.component';

describe('A1SpacerZPsemComponent', () => {
  let component: A1SpacerZPsemComponent;
  let fixture: ComponentFixture<A1SpacerZPsemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A1SpacerZPsemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A1SpacerZPsemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
