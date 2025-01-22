import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentLibraryService {
  
  private library = [
    { type: 'image', url: 'https://via.placeholder.com/150' },
    { type: 'image', url: 'https://via.placeholder.com/300' },
    { type: 'video', url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
  ];

  getLibrary() {
    return this.library;
  }

  constructor() { }
}
