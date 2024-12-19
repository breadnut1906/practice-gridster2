import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridsterLayoutComponent } from './gridster-layout.component';

describe('GridsterLayoutComponent', () => {
  let component: GridsterLayoutComponent;
  let fixture: ComponentFixture<GridsterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridsterLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridsterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
