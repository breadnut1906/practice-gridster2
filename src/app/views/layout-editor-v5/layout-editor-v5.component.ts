import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout-editor-v5',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './layout-editor-v5.component.html',
  styleUrl: './layout-editor-v5.component.scss'
})
export class LayoutEditorV5Component {
  
  @ViewChild('workspace') workspace!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLDivElement>;

  resolutions = [
    { label: '1920x1080', width: 1920, height: 1080 },
    { label: '1600x900', width: 1600, height: 900 },
    { label: '1280x720', width: 1280, height: 720 },
    { label: '800x600', width: 800, height: 600 },
    { label: '640x480', width: 640, height: 480 }
  ];

  currentWidth = this.resolutions[0].width;
  currentHeight = this.resolutions[0].height;
  zoomScale = 1;
  zoomStep = 0.1;
  minZoom = 0.1;
  maxZoom = 5;
  isPanning = false;
  startX = 0;
  startY = 0;
  scrollLeft = 0;
  scrollTop = 0;

  ngAfterViewInit() {
    this.centerCanvas();
  }

  changeResolution(event: Event) {
    const [width, height] = (event.target as HTMLSelectElement).value.split(',').map(Number);
    this.currentWidth = width;
    this.currentHeight = height;
    this.zoomScale = 1;
    this.centerCanvas();
  }

  zoomIn() {
    this.setZoom(this.zoomScale + this.zoomStep);
  }

  zoomOut() {
    this.setZoom(this.zoomScale - this.zoomStep);
  }

  zoomMin() {
    this.setZoom(this.minZoom);
  }

  zoomMax() {
    this.setZoom(this.maxZoom);
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    event.preventDefault();
    const scaleChange = event.deltaY < 0 ? this.zoomStep : -this.zoomStep;
    this.setZoom(this.zoomScale + scaleChange, event.clientX, event.clientY);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isPanning = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.scrollLeft = this.workspace.nativeElement.scrollLeft;
    this.scrollTop = this.workspace.nativeElement.scrollTop;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isPanning = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isPanning) return;
    event.preventDefault();
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    this.workspace.nativeElement.scrollLeft = this.scrollLeft - dx;
    this.workspace.nativeElement.scrollTop = this.scrollTop - dy;
  }

  private setZoom(newZoom: number, clientX?: number, clientY?: number) {
    const workspace = this.workspace.nativeElement;
    const rect = workspace.getBoundingClientRect();
    const prevZoom = this.zoomScale;
    this.zoomScale = Math.min(Math.max(newZoom, this.minZoom), this.maxZoom);

    if (clientX !== undefined && clientY !== undefined) {
      const dx = (clientX - rect.left - workspace.clientWidth / 2) * (this.zoomScale - prevZoom);
      const dy = (clientY - rect.top - workspace.clientHeight / 2) * (this.zoomScale - prevZoom);
      workspace.scrollLeft += dx;
      workspace.scrollTop += dy;
    }
  }

  private centerCanvas() {
    setTimeout(() => {
      const workspace = this.workspace.nativeElement;
      workspace.scrollLeft = (workspace.scrollWidth - workspace.clientWidth) / 2;
      workspace.scrollTop = (workspace.scrollHeight - workspace.clientHeight) / 2;
    }, 0);
  }
}
