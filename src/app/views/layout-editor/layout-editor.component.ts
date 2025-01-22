import { Component } from '@angular/core';
import interact from 'interactjs';
import html2canvas from 'html2canvas';
import { UiModule } from '../../modules/ui/ui.module';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-layout-editor',
  standalone: true,
  imports: [ UiModule, DragDropModule ],
  templateUrl: './layout-editor.component.html',
  styleUrl: './layout-editor.component.scss'
})
export class LayoutEditorComponent {
  // items: any[] = [
  //   { id: 1, text: 'Text 1', width: 100, height: 50, x: 0, y: 0 },
  //   { id: 2, text: 'Text 2', width: 200, height: 100, x: 150, y: 50 },
  // ];
  // isPreviewMode = false;

  // ngOnInit() {
  //   this.initializeInteractions();
  // }

  // initializeInteractions() {
  //   interact('.grid-item')
  //     .draggable({
  //       listeners: {
  //         move(event) {
  //           const target = event.target;
  //           const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  //           const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  //           target.style.transform = `translate(${x}px, ${y}px)`;
  //           target.setAttribute('data-x', x);
  //           target.setAttribute('data-y', y);
  //         },
  //       },
  //       modifiers: [
  //         interact.modifiers.snap({
  //           targets: [interact.snappers.grid({ x: 50, y: 50 })],
  //           range: Infinity,
  //         }),
  //       ],
  //     })
  //     .resizable({
  //       edges: { left: true, right: true, bottom: true, top: true },
  //       listeners: {
  //         move(event) {
  //           const target = event.target;
  //           const width = parseFloat(target.style.width) + event.deltaRect.width;
  //           const height = parseFloat(target.style.height) + event.deltaRect.height;

  //           target.style.width = `${width}px`;
  //           target.style.height = `${height}px`;
  //         },
  //       },
  //     });
  // }

  // togglePreview() {
  //   this.isPreviewMode = !this.isPreviewMode;
  // }

  // exportLayout() {
  //   const layoutJson = JSON.stringify(this.items, null, 2);
  //   const blob = new Blob([layoutJson], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'layout.json';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // exportToImage() {
  //   const container: any = document.querySelector('.grid-container');
  //   if (container) {
  //     html2canvas(container).then((canvas) => {
  //       const link = document.createElement('a');
  //       link.download = 'layout.png';
  //       link.href = canvas.toDataURL();
  //       link.click();
  //     });
  //   }
  // }
  items: any[] = [
    { id: 1, text: 'Text 1', width: 100, height: 50, x: 0, y: 0 },
    { id: 2, text: 'Text 2', width: 200, height: 100, x: 150, y: 50 },
  ];
  isPreviewMode = false;

  assetList = [
    { id: 'img1', type: 'image', src: 'https://placehold.co/100x100/000000/FFFFFF/png' },
    // { id: 'vid1', type: 'video', src: 'assets/example-video.mp4' },
  ];

  layoutContainers: any[] = [];
  
  ngOnInit() {
    this.initializeInteractions();
  }

  initializeInteractions() {
    interact('.layout-container')
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        },
        modifiers: [
          interact.modifiers.snap({
            targets: [interact.snappers.grid({ x: 50, y: 50 })],
            range: Infinity,
          }),
        ],
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            const target = event.target;
            const width = parseFloat(target.style.width) + event.deltaRect.width;
            const height = parseFloat(target.style.height) + event.deltaRect.height;

            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
          },
        },
      });
  }

  togglePreview() {
    this.isPreviewMode = !this.isPreviewMode;
  }

  drop(event: CdkDragDrop<any[]>) {    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addNewContainer() {
    this.layoutContainers.push({ id: `container-${Date.now()}`, items: [] });
  }
}
