import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Advancegallery } from './advancegallery';

describe('Advancegallery', () => {
  let component: Advancegallery;
  let fixture: ComponentFixture<Advancegallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Advancegallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Advancegallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
