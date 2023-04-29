import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B1storiesComponent } from './b1stories.component';

describe('B1storiesComponent', () => {
  let component: B1storiesComponent;
  let fixture: ComponentFixture<B1storiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B1storiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(B1storiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
