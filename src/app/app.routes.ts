import { Routes } from '@angular/router';
import {
  canMatchDeviceDesktop,
  canMatchDeviceMobile,
  canMatchDeviceTWA,
} from '@/core/guards';

export const routes: Routes = [
  {
    path: '',
    canMatch: [canMatchDeviceDesktop],
    loadComponent: () =>
      import('./pages/products/web/products-web/products-web.component'),
  },
  {
    path: '',
    canMatch: [canMatchDeviceTWA],
    loadComponent: () =>
      import('./pages/products/twa/products-twa/products-twa.component'),
  },

  {
    path: '',
    canMatch: [canMatchDeviceMobile],
    loadComponent: () =>
      import(
        './pages/products/mobile/products-mobile/products-mobile.component'
      ),
  },
];
