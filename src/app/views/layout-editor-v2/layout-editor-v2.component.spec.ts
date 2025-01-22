import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorV2Component } from './layout-editor-v2.component';

describe('LayoutEditorV2Component', () => {
  let component: LayoutEditorV2Component;
  let fixture: ComponentFixture<LayoutEditorV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEditorV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEditorV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
