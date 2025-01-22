import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./components/gridster-layout/gridster-layout.component').then((m) => m.GridsterLayoutComponent),
        // loadComponent: () => import('./components/gantt-chart/gantt-chart.component').then((m) => m.GanttChartComponent),
        // loadComponent: () => import('./views/layout-editor/layout-editor.component').then((m) => m.LayoutEditorComponent),
        loadComponent: () => import('./views/layout-editor-v2/layout-editor-v2.component').then((m) => m.LayoutEditorV2Component),
        // loadComponent: () => import('./views/layout-editor-v3/layout-editor-v3.component').then((m) => m.LayoutEditorV3Component),
        title: 'Home'
    }
];
