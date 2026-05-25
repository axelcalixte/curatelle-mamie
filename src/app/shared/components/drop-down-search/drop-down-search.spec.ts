import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownSearch } from './drop-down-search';

describe('DropDownSearch', () => {
  let component: DropDownSearch;
  let fixture: ComponentFixture<DropDownSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(DropDownSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
