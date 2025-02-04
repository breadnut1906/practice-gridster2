import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canva-editor',
  standalone: true,
  imports: [],
  templateUrl: './canva-editor.component.html',
  styleUrl: './canva-editor.component.scss'
})
export class CanvaEditorComponent {
  
  @ViewChild('canvaFrame', { static: false }) canvaFrame!: ElementRef<HTMLIFrameElement>;

  private apiKey: string = 'AAGeANA7DS0';  // Replace with your API key

  ngAfterViewInit() {
    const iframe = this.canvaFrame.nativeElement;
    iframe.src = `https://www.canva.com/embed?apiKey=${this.apiKey}`;
  
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://www.canva.com') return;
  
      console.log('Canva Event:', event.data);
    });
  }

}
