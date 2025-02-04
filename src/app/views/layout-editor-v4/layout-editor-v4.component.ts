import { Component, ElementRef, ViewChild } from '@angular/core';
import { UiModule } from '../../modules/ui/ui.module';
import { NgxSelectoModule } from 'ngx-selecto';
import { DraggableRequestParam, NgxMoveableComponent } from 'ngx-moveable';

@Component({
  selector: 'app-layout-editor-v4',
  standalone: true,
  imports: [ UiModule, NgxSelectoModule ],
  templateUrl: './layout-editor-v4.component.html',
  styleUrl: './layout-editor-v4.component.scss',
})
export class LayoutEditorV4Component {
  

  window = window.document;

  @ViewChild("dragContainer") dragContainer!: ElementRef<HTMLDivElement>;
  
  @ViewChild("moveableRef") moveableRef!: NgxMoveableComponent;
  targets: Array<HTMLElement | SVGElement> = [];
  layers: { name: string, top: number; left: number; image?: string, width?: number, height?: number }[] = [];
  
  edge: any;
  draggable: any = true;
  selectByClick: boolean = true;
  throttleDrag: any = 1;
  edgeDraggable: any = false;
  startDragRotate: any = 0;
  throttleDragRotate: any = 0;
  keepRatio: any = false;
  throttleScale: any = 0;
  renderDirections: any = ["nw","n","ne","w","e","sw","s","se"];
  rotatable: any = true;
  throttleRotate: any = 0;
  rotationPosition: any = "top";
  originDraggable: any = true;
  originRelative: any = true;
  bounds: any = {"left":0,"top":0,"right":0,"bottom":0,"position":"css"};
  // @ViewChild("targetRef") targetRef!: ElementRef<HTMLDivElement>;
  // onDragOrigin(e: any) {
  //     e.target.style.transformOrigin = e.transformOrigin;
  // }
  // onRender(e: any) {
  //     e.target.style.transform = e.transform;
  // }


  onClickAdd() {
    this.layers.push({ name: `Layer ${this.layers.length + 1}`, top: 50, left: 50 });

  }

  onClickUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.layers.push({ name: `Layer ${this.layers.length + 1}`, top: 200, left: 200, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onRender(e: any) {
      e.target.style.cssText += e.cssText;
  }
  onRenderGroup(e: any) {
      e.events.forEach((ev: any) => {
          ev.target.style.cssText += ev.cssText;
      });
  }
  onDragStart(e: any) {
      const moveable = this.moveableRef!;
      const target = e.inputEvent.target;
      if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
          || this.targets.some(t => t === target || t.contains(target))
      ) {
        e.stop();
      }
  }
  onSelectEnd(e: any) {
      const moveable: any = this.moveableRef!;
      if (e.isDragStart) {
          e.inputEvent.preventDefault();
          moveable.waitToChangeTarget().then(() => {
              moveable.dragStart(e.inputEvent);
          });
      }
      this.targets = e.selected;
  }

  onResize(e: any) {
    const target = e.target;
    const layer = this.layers[target.id];
    this.layers[target.id] = {...layer, width: e.width, height: e.height };        
  }

  onClickExport() {
    console.log(this.layers);
    
  }
}