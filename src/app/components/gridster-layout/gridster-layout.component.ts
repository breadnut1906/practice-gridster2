import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UiModule } from '../../modules/ui/ui.module';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import EditorJS from '@editorjs/editorjs'; 
import Header from '@editorjs/header';
import List from '@editorjs/list';
// import Marker from '@editorjs/marker';

@Component({
  selector: 'app-gridster-layout',
  standalone: true,
  imports: [ UiModule ],
  templateUrl: './gridster-layout.component.html',
  styleUrl: './gridster-layout.component.scss'
})
export class GridsterLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  gridOptions: GridsterConfig = {
    gridType: 'fit',
    // displayGrid: 'none',
    compactType: 'none',
    itemChangeCallback: this.itemChangeCallback,
    pushItems: true,
    draggable: {
      enabled: true, // Enables dragging
      stop: (item, gridItem: any) => this.onDragStop(item, gridItem),
    },
    resizable: {
      enabled: true, // Enables resizing
      stop: (item, gridItem: any) => this.onResizeStop(item, gridItem),
    },
    margin: 10,
    outerMargin: true,
    minCols: 12,
    maxCols: 12,
    minRows: 6,
    fixedColWidth: 100,
    fixedRowHeight: 100,
    api: {},
    allowMultiLayer: true
  }

  dashboardItems: GridsterItem[] = [
    { x: 0, y: 0, cols: 2, rows: 1, content: 'Sample Text', type: 'text' }
  ];

  newText: string = '';
  uploadedImage: string | null = null;

  // Resolutions for user selection
  resolutions = [
    { label: '720p (1280x720)', width: 1280, height: 720 },
    { label: '1080p (1920x1080)', width: 1920, height: 1080 },
    { label: '4K (3840x2160)', width: 3840, height: 2160 },
  ];

  orientation: 'landscape' | 'portrait' = 'landscape';

  private editor: EditorJS | null = null;
  private editorReadonly: EditorJS | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Ensure the Gridster API is initialized
    this.onInitializeEditorJS();
    this.gridOptions.api = this.gridOptions.api || {};
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }

  changeResolution(value: any) {
    const resolution = value.target.value;

    const [width, height] = resolution.split('x').map(Number);
    this.updateGrid(width, height);
  }

  changeOrientation(value: any) {
    const orientation = value.target.value;
    if (orientation === 'landscape') {
      // Landscape settings: wide grid
      this.gridOptions.minCols = 12;
      this.gridOptions.maxCols = 12;
      this.gridOptions.fixedColWidth = 100;
      this.gridOptions.fixedRowHeight = 75; // Wider layout
    } else {
      // Portrait settings: tall grid
      this.gridOptions.minCols = 6;
      this.gridOptions.maxCols = 6;
      this.gridOptions.fixedColWidth = 75; // Narrower layout
      this.gridOptions.fixedRowHeight = 100;
    }

    console.log(`Orientation changed to: ${orientation}`);
    console.log(`Updated Grid Options:`, this.gridOptions);

    // Trigger grid refresh
    if (this.gridOptions.api?.optionsChanged) {
      this.gridOptions.api.optionsChanged();
    }
  }

  private getSelectedResolution(): [number, number] {
    // Get the currently selected resolution dimensions
    const selectElement = document.getElementById('resolution') as HTMLSelectElement;
    const value = selectElement?.value || '1280x720';
    return value.split('x').map(Number) as [number, number];
  }

  private updateGrid(width: number, height: number) {
    // Adjust dimensions based on orientation
    if (this.orientation === 'portrait') {
      [width, height] = [height, width]; // Swap dimensions for portrait mode
    }

    const cols = 12;
    const colWidth = Math.floor(width / cols);
    const rowHeight = Math.floor(height / cols);

    console.log(`Updated Grid: ${this.orientation} (${width}x${height})`);
    console.log(`Column Width: ${colWidth}, Row Height: ${rowHeight}`);

    this.gridOptions.fixedColWidth = colWidth;
    this.gridOptions.fixedRowHeight = rowHeight;

    // Trigger grid refresh
    if (this.gridOptions.api?.optionsChanged) {
      this.gridOptions.api.optionsChanged();
    }
  }  

  // Adds a new item (either an image or text) to the grid
  addItem() {
    if (this.editor) {
      this.editor.save().then(async (result: any) => {
        
        this.dashboardItems.push({
          x: 2,
          y: 0,
          cols: 2,
          rows: 1,
          content: result,
          type: 'text'
        });

        await this.initializedReadonly();
        // this.editorReadonly?.render(result);
      })
    } else {
      if (this.uploadedImage) {
        this.dashboardItems.push({
          x: 2,
          y: 0,
          cols: 2,
          rows: 2,
          content: this.uploadedImage,
          type: 'image'
        });
        this.uploadedImage = null; // Reset after adding
      } else if (this.newText) {
        this.dashboardItems.push({
          x: 2,
          y: 0,
          cols: 2,
          rows: 1,
          content: this.newText,
          type: 'text'
        });
        this.newText = ''; // Reset after adding
      }
    }
  }

  // Handles file uploads
  uploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Callback when an item changes its position
  itemChangeCallback(item: any) {
    console.log('Item changed', item);
  }

  // Edit an item (e.g., for deleting or updating content)
  editItem(item: any) {
    console.log('Item clicked:', item);
    // Implement your logic for editing the item (like removing or updating content)
  }

  onDragStop(item: GridsterItem, gridItem: GridsterItem) {
    console.log('Drag stopped:', item);
  }

  onResizeStop(item: GridsterItem, gridItem: GridsterItem) {
    console.log('Resize stopped:', item);
  }

  onInitializeEditorJS() {
    this.editor = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Let`s write an awesome story!',
      tools: {
        header: {
          class: Header as any,
          inlineToolbar: ['link'],
          config: {
            placeholder: 'Enter a header...',
            levels: [1, 2, 3]  // Example config, adjust as necessary
          }
        },
        list: {
          class: List as any,
          inlineToolbar: ['link', 'bold'],
          config: {
            placeholder: 'Enter a list item...',
          }
        }
      }
    });
  }

  initializedReadonly() {
    return new Promise((resolve, reject) => {
      this.editorReadonly = new EditorJS({
        holder: 'editorjsReadonly',
        readOnly: true,
        tools: {
          header: {
            class: Header as any,
            inlineToolbar: ['link'],
            config: {
              placeholder: 'Enter a header...',
              levels: [1, 2, 3]  // Example config, adjust as necessary
            }
          },
          list: {
            class: List as any,
            inlineToolbar: ['link', 'bold'],
            config: {
              placeholder: 'Enter a list item...',
            }
          }
        },
        onReady: () => {
           console.log('Editor.js is ready to work!')
        }
      });
      resolve(this.editorReadonly)
    })
  }  
}
