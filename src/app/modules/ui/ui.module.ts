import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule, CdkDropList, CdkDropListGroup, CdkDrag, CdkDragPlaceholder  } from '@angular/cdk/drag-drop';
import { NgxMoveableComponent } from 'ngx-moveable';
import { NgxSelectoComponent } from 'ngx-selecto';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    GridsterComponent,
    GridsterItemComponent,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropList, 
    CdkDropListGroup,
    NgxMoveableComponent,
  ],
  exports: [
    CommonModule,
    GridsterComponent,
    GridsterItemComponent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    DragDropModule,
    NgxMoveableComponent,
    
  ]
})

export class UiModule { }
