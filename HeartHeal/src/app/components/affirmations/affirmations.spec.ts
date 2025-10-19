import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Affirmations } from './affirmations';

describe('Affirmations', () => {
  let component: Affirmations;
  let fixture: ComponentFixture<Affirmations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Affirmations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Affirmations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
