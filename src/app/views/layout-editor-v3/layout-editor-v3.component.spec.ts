import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorV3Component } from './layout-editor-v3.component';

describe('LayoutEditorV3Component', () => {
  let component: LayoutEditorV3Component;
  let fixture: ComponentFixture<LayoutEditorV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEditorV3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEditorV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
