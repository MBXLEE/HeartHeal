import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountability } from './accountability';

describe('Accountability', () => {
  let component: Accountability;
  let fixture: ComponentFixture<Accountability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accountability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
