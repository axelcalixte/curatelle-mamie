import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorize } from './categorize';

describe('Categorize', () => {
  let component: Categorize;
  let fixture: ComponentFixture<Categorize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorize],
    }).compileComponents();

    fixture = TestBed.createComponent(Categorize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
