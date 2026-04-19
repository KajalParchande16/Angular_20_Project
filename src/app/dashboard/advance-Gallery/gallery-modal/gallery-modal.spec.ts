import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryModal } from './gallery-modal';

describe('GalleryModal', () => {
  let component: GalleryModal;
  let fixture: ComponentFixture<GalleryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
