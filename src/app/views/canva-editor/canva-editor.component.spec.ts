import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvaEditorComponent } from './canva-editor.component';

describe('CanvaEditorComponent', () => {
  let component: CanvaEditorComponent;
  let fixture: ComponentFixture<CanvaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvaEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
