import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2storiesComponent } from './b2stories.component';

describe('B2storiesComponent', () => {
  let component: B2storiesComponent;
  let fixture: ComponentFixture<B2storiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2storiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B2storiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
