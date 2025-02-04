import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./views/layout-editor-v2/layout-editor-v2.component').then((m) => m.LayoutEditorV2Component), // Might be useful
        // loadComponent: () => import('./views/layout-editor-v4/layout-editor-v4.component').then((m) => m.LayoutEditorV4Component),
        loadComponent: () => import('./views/layout-editor-v5/layout-editor-v5.component').then((m) => m.LayoutEditorV5Component),
        title: 'Home'
    }
];
