import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorV4Component } from './layout-editor-v4.component';

describe('LayoutEditorV4Component', () => {
  let component: LayoutEditorV4Component;
  let fixture: ComponentFixture<LayoutEditorV4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEditorV4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEditorV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
