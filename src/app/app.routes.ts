import { Routes } from '@angular/router';
import {
  canMatchDeviceDesktop,
  canMatchDeviceMobile,
  canMatchDeviceTWA,
} from '@/core/guards';
import { productResolver } from './core/resolvers/product.resolver';

const TWA_ROUTES: Routes = [
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
      {
        path: 'product/:id',
        data: {
          fullScreen: true,
        },
        resolve: {
          product: productResolver,
        },
        loadComponent: () =>
          import(
            '@/pages/product-detail/twa/product-detail-twa/product-detail-twa.component'
          ),
      },
    ],
  },
];

const WEB_ROUTES: Routes = [
  {
    path: '',
    canMatch: [canMatchDeviceDesktop],
    loadComponent: () =>
      import('@/layout/content/desktop/content-desktop.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/products/web/products-web/products-web.component'),
      },
      {
        path: ':category?',
        loadComponent: () =>
          import('./pages/products/web/products-web/products-web.component'),
      },
    ],
  },
];

export const routes: Routes = [
  ...WEB_ROUTES,
  // ...TWA_ROUTES,
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
