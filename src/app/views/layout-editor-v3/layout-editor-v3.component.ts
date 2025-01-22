import { Component, ElementRef, ViewChild } from '@angular/core';
import { UiModule } from '../../modules/ui/ui.module';
import interact from 'interactjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-layout-editor-v3',
  standalone: true,
  imports: [ UiModule ],
  templateUrl: './layout-editor-v3.component.html',
  styleUrl: './layout-editor-v3.component.scss'
})
export class LayoutEditorV3Component {
  @ViewChild('gridContainer') gridContainer!: ElementRef;

  items = [
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+1" },
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+2" },
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+3" },
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+4" },
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+5" },
    { src: "https://placehold.co/300x200/000000/ffffff.png?text=Image+6" },
  ];

  ngAfterViewInit() {
    interact('.grid-item')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 200, y: 150 })],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          }),
          interact.modifiers.restrictRect({
            restriction: this.gridContainer.nativeElement,
            endOnly: true
          })
        ],
        onmove: this.dragMoveListener
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 200, y: 150 })],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
          })
        ],
        inertia: true
      })
      .on('resizemove', this.resizeMoveListener);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  dragMoveListener(event: any) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  resizeMoveListener(event: any) {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}
