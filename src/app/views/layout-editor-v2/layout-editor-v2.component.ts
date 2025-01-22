import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import interact from 'interactjs';
import html2canvas from 'html2canvas';
import { UiModule } from '../../modules/ui/ui.module';

import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-layout-editor-v2',
  standalone: true,
  imports: [ UiModule ],
  templateUrl: './layout-editor-v2.component.html',
  styleUrl: './layout-editor-v2.component.scss'
})
export class LayoutEditorV2Component {
  
  @ViewChild('layer') layerContainer!: ElementRef;
  @ViewChild('rotateIcon') rotateIcon!: ElementRef;
  isRotating = false;  

  layers: any = [];
  
  imageArray = [
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+1",
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+2",
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+3",
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+4",
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+5",
    "https://placehold.co/300x200/000000/ffffff.png?text=Image+6"
  ];
  

  constructor(private dialog: MatDialog, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeInteract();
    this.initializedRotation();
  }

  ngAfterViewInit(): void { }

  initializeInteract() {
    interact('.layer')
      .draggable({
        onmove: this.moveElement.bind(this),
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.canvas',
            endOnly: false,
            offset: { 
              top: 20, // 20px from the top of the parent
              left: 20, // 20px from the left of the parent
              bottom: 20, // 20px from the bottom of the parent (negative because it's from the end)
              right: 20, // 20px from the right of the parent (negative because it's from the end)
             }
          })
        ]
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        // Set minimum dimensions for the layers
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 100, height: 100 }, // Minimum width and height
          }),
          interact.modifiers.restrict({
            restriction: '.canvas',
            endOnly: false,
            offset: { 
              top: 20, // 20px from the top of the parent
              left: 20, // 20px from the left of the parent
              bottom: 20, // 20px from the bottom of the parent (negative because it's from the end)
              right: 20, // 20px from the right of the parent (negative because it's from the end)
             }
          })
          // interact.modifiers.restrictRect({
          //   restriction: '.canvas',
          //   endOnly: true,
          // })
        ],
        listeners: {
          move(event) {
            let target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;

            Object.assign(target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              transform: `translate(${x}px, ${y}px)`,
            });

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        },
      })
  }

  initializedRotation() {
    let angle = 0; // Initial rotation angle
    let transform = { x: 0, y: 0 };
    interact('.rotation-btn').draggable({
      listeners: {
        start(event) {
          const box: any = document.querySelector('.layer');
          const rect = box.getBoundingClientRect();
          event.target['cx'] = rect.left + rect.width / 2;
          event.target['cy'] = rect.top + rect.height / 2;
        },
        move(event) {
          const box: any = document.querySelector('.layer');
          const cx = event.target['cx'];
          const cy = event.target['cy'];
          const dx = event.clientX - cx;
          const dy = event.clientY - cy;
          angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          box.style.transform = `translate(${transform.x}px, ${transform.y}px) rotate(${angle}deg)`;
        },
      }
    });
  }

  moveElement(event: any) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    Object.assign(target.style, {
      transform: `translate(${x}px, ${y}px)`,
    });
    
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  openImageUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*,video/*';
    fileInput.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        this.addLayer(url, type);
      }
    };
    fileInput.click();
  }


  addLayer(url: string = '', type: 'image' | 'video' = 'image') {
    const newLayer = {
      url: url,
      type: type,
      position: { x: 50, y: 50 } // Default position
    };
    this.layers.push(newLayer);
  }

  removeLayer(layer: any) {
    this.layers = this.layers.filter((l: any) => l !== layer);
  }

  exportCanvas() {
    const canvas: any = document.querySelector('.canvas');
    html2canvas(canvas).then((canvas) => {
      
      // Create an SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('width', canvas.width.toString());
      svg.setAttribute('height', canvas.height.toString());

      // Convert the canvas to a base64 image and embed in SVG
      const img = canvas.toDataURL('image/png');
      const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', img);
      image.setAttribute('width', canvas.width.toString());
      image.setAttribute('height', canvas.height.toString());

      svg.appendChild(image);

      // Serialize the SVG and download
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'export.svg';
      a.click();

      // Cleanup
      URL.revokeObjectURL(url);
    });
    
    // const node = document.getElementById('exportDiv');
    // if (node) {
    //   const videoElement = document.querySelector('video');
    //   if (videoElement) {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     canvas.width = videoElement.videoWidth;
    //     canvas.height = videoElement.videoHeight;
    //     context?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
    //     const dataUrl = canvas.toDataURL('image/png');
    //     // Replace video with the captured image
    //     const imgElement = document.createElement('img');
    //     imgElement.src = dataUrl;
    //     videoElement.parentNode?.replaceChild(imgElement, videoElement);
    //   }
  
    //   htmlToImage.toSvg(node)
    //     .then((dataUrl) => {
    //       const link = document.createElement('a');
    //       link.download = 'exported-image-with-video-frame.svg';
    //       link.href = dataUrl;
    //       link.click();
    //     });
    //   }
  }
}
