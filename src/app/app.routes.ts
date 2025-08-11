import { Routes } from '@angular/router';
import {
  canMatchDeviceDesktop,
  canMatchDeviceMobile,
  canMatchDeviceTWA,
} from '@/core/guards';

export const routes: Routes = [
  // {
  //   path: '',
  //   canMatch: [canMatchDeviceDesktop],
  //   loadComponent: () =>
  //     import('@/layout/content/desktop/content-desktop.component'),
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import('./pages/products/web/products-web/products-web.component'),
  //     },
  //   ],
  // },
  {
    path: '',
    // canMatch: [canMatchDeviceTWA],
    loadComponent: () => import('@/layout/content/twa/content-twa.component'),
    data: {
      header: {
        title: 'Products TWA',
        description: 'Products TWA page description',
      },
    },
    children: [
      {
        path: '',

        loadComponent: () =>
          import('./pages/products/twa/products-twa/products-twa.component'),
      },
    ],
  },

  // {
  //   path: '',
  //   canMatch: [canMatchDeviceMobile],
  //   loadComponent: () =>
  //     import('@/layout/content/mobile/content-mobile.component'),
  //   children: [
  //     {
  //       path: '',
  //       loadComponent: () =>
  //         import(
  //           './pages/products/mobile/products-mobile/products-mobile.component'
  //         ),
  //     },
  //   ],
  // },
];
