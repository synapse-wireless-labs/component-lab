import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootContainerComponent } from './containers/root';
import { PreviewContainerComponent } from './containers/preview';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/experiment',
    pathMatch: 'full'
  },
  {
    path: 'experiment',
    component: RootContainerComponent,
    children: [
      {
        path: ''
      },
      {
        path: 'preview/:experimentID/:caseID',
        component: PreviewContainerComponent
      },
    ],
  },
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);