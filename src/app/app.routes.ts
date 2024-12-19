import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // loadComponent: () => import('./components/gridster-layout/gridster-layout.component').then((m) => m.GridsterLayoutComponent),
        loadComponent: () => import('./components/gantt-chart/gantt-chart.component').then((m) => m.GanttChartComponent),
        title: 'Home'
    }
];
