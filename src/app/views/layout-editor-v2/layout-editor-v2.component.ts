import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import interact from 'interactjs';
import { UiModule } from '../../modules/ui/ui.module';

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

  transform = { x: 0, y: 0, a: 0 };
  

  constructor(private dialog: MatDialog, private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeInteract();
    // this.initializedRotation();
  }

  ngAfterViewInit(): void { }

  initializeInteract() {
    interact('.layer')
      .draggable({
        inertia: true,
        listeners: {
          move: this.moveElement.bind(this),
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.canvas',
            endOnly: true,
            offset: { top: 20, left: 20, bottom: 20, right: 20 }
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
            // offset: { 
            //   top: 20, // 20px from the top of the parent
            //   left: 20, // 20px from the left of the parent
            //   bottom: 20, // 20px from the bottom of the parent (negative because it's from the end)
            //   right: 20, // 20px from the right of the parent (negative because it's from the end)
            //  }
          })
        ],
        listeners: {
          move: this.onResizeElement.bind(this),
          // move(event) {
          //   let target = event.target;
          //   let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
          //   let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;

          //   Object.assign(target.style, {
          //     width: `${event.rect.width}px`,
          //     height: `${event.rect.height}px`,
          //     transform: `translate(${x}px, ${y}px)`,
          //   });

          //   target.setAttribute('data-x', x);
          //   target.setAttribute('data-y', y);
          // }
        },
      })


      interact('.rotation-btn').draggable({
        inertia: true,
        listeners: {
          start(event) {
            const layer = event.target.closest('.layer');
            if (layer) {
              const rect = layer.getBoundingClientRect();
              event.target['cx'] = rect.left + rect.width / 2;
              event.target['cy'] = rect.top + rect.height / 2;
            }
            // const box: any = document.querySelectorAll('.layer');
            // const parentId = event.target.parentElement.id;
            
            // const rect = box[parentId].getBoundingClientRect();          
            // event.target['cx'] = rect.left + rect.width / 2;
            // event.target['cy'] = rect.top + rect.height / 2;
          },
          move: this.onRotateElement.bind(this),
        }
      });
  }

  initializedRotation() {
    interact('.rotation-btn').draggable({
      inertia: true,
      listeners: {
        start(event) {
          const layer = event.target.closest('.layer');
          if (layer) {
            const rect = layer.getBoundingClientRect();
            event.target['cx'] = rect.left + rect.width / 2;
            event.target['cy'] = rect.top + rect.height / 2;
          }
          // const box: any = document.querySelectorAll('.layer');
          // const parentId = event.target.parentElement.id;
          
          // const rect = box[parentId].getBoundingClientRect();          
          // event.target['cx'] = rect.left + rect.width / 2;
          // event.target['cy'] = rect.top + rect.height / 2;
        },
        move: this.onRotateElement.bind(this),
      }
    });
  }

  moveElement(event: any) {

    const target = event.target;
    const transform = this.getCurrentTransform(target);

    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    this.transform.x = x;
    this.transform.y = y;

    target.style.transform = `translate(${x}px, ${y}px) rotate(${transform.a}deg)`;
    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());
    // const box: any = document.querySelectorAll('.layer');
    // const target = event.target;
    
    // const transformString = box[target.id].style.transform;
    // const rotationMatch = transformString.match(/rotate\((-?\d+\.?\d*)deg\)/);    

    // const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    // const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;    

    // this.transform.x = x;
    // this.transform.y = y;

    // Object.assign(target.style, {
    //   transform: `translate(${x}px, ${y}px) rotate(${parseFloat(rotationMatch[1])}deg)`,
    // });
    
    // target.setAttribute('data-x', x);
    // target.setAttribute('data-y', y);    
  }

  onRotateElement(event: any) {
    // const box: any = document.querySelectorAll('.layer');
    // const parentId = event.target.parentElement.id;
    // const cx = event.target['cx'];
    // const cy = event.target['cy'];
    // const dx = event.clientX - cx;
    // const dy = event.clientY - cy;
    // this.transform.a = (Math.atan2(dy, dx) * 180) / Math.PI;
    // box[parentId].style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) rotate(${this.transform.a}deg)`;

    const layer = event.target.closest('.layer');
    if (!layer) return;

    const cx = event.target['cx'];
    const cy = event.target['cy'];
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    this.transform.a = angle;
    layer.style.transform = `translate(${this.transform.x}px, ${this.transform.y}px) rotate(${angle}deg)`;
  
  }

  onResizeElement(event: any) {
    // let x: number = 0;
    // let y: number = 0;

    // const box: any = document.querySelectorAll('.layer');
    // let target = event.target;
    
    // const transformString = box[target.id].style.transform;
    // const rotationMatch = transformString.match(/rotate\((-?\d+\.?\d*)deg\)/);
    // const newAngle = parseFloat(rotationMatch[1]);

    // x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
    // y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;    

    // Object.assign(target.style, {
    //   width: `${event.rect.width}px`,
    //   height: `${event.rect.height}px`,
    //   transform: `translate(${x}px, ${y}px) rotate(${newAngle}deg)`,
    // });

    // target.setAttribute('data-x', x);
    // target.setAttribute('data-y', y);

    const target = event.target;
    const transform = this.getCurrentTransform(target);

    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;

    target.style.width = `${event.rect.width}px`;
    target.style.height = `${event.rect.height}px`;
    target.style.transform = `translate(${x}px, ${y}px) rotate(${transform.a}deg)`;

    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());
  }


  getCurrentTransform(target: any) {
    const transformString = target.style.transform;
    const match = transformString.match(/rotate\((-?\d+\.?\d*)deg\)/);
    return {
      x: parseFloat(target.getAttribute('data-x')) || 0,
      y: parseFloat(target.getAttribute('data-y')) || 0,
      a: match ? parseFloat(match[1]) : 0
    };
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

  addLayer(url: string = '',  type: 'image' | 'video' = 'image', x: number = 50, y: number = 50) {
    const newLayer = { url: url, type: type, position: { x, y, a: 0 } };
    this.layers.push(newLayer);
  }

  removeLayer(layer: any) {
    this.layers = this.layers.filter((l: any) => l !== layer);
  }

  onDropAsset(data: any) {
    const { item, event } = data;
    const x = event.offsetX;
    const y = event.offsetY;    
    this.addLayer(item.data, 'image', x, y);
  }

  exportCanvas() {
    console.log('Export layout');
    
  }
}
