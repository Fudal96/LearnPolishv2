import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A2storiesComponent } from './a2stories.component';

describe('A2storiesComponent', () => {
  let component: A2storiesComponent;
  let fixture: ComponentFixture<A2storiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A2storiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A2storiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
