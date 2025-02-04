import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEditorV5Component } from './layout-editor-v5.component';

describe('LayoutEditorV5Component', () => {
  let component: LayoutEditorV5Component;
  let fixture: ComponentFixture<LayoutEditorV5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutEditorV5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutEditorV5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
