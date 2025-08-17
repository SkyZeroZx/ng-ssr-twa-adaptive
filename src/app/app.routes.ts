import { NAV_HEADER_TITLES } from '@/core/constants/headers';
import {
  canMatchDeviceDesktop,
  canMatchDeviceMobile,
  canMatchDeviceTWA,
} from '@/core/guards';
import { productResolver } from '@/core/resolvers';
import { Routes } from '@angular/router';

const TWA_ROUTES: Routes = [
  {
    path: '',
    title: 'Shop TWA',
    data: {
      header: NAV_HEADER_TITLES.SHOP,
    },
    canMatch: [canMatchDeviceTWA],
    loadComponent: () => import('@/layout/content/twa/content-twa.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/pages/shop/twa/shop-twa/shop-twa.component'),
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
    title: 'Shop Web',
    canMatch: [canMatchDeviceDesktop],
    loadComponent: () =>
      import('@/layout/content/desktop/content-desktop.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/pages/shop/web/shop-web/shop-web.component'),
      },
      {
        path: ':category',
        loadComponent: () =>
          import('@/pages/shop/web/shop-web/shop-web.component'),
      },
      {
        path: 'product/:id',
        resolve: {
          product: productResolver,
        },
        loadComponent: () =>
          import(
            '@/pages/product-detail/web/product-detail-web/product-detail-web.component'
          ),
      },
    ],
  },
];

const MOBILE_ROUTES: Routes = [
  {
    path: '',
    canMatch: [canMatchDeviceMobile],
    title: 'Shop Mobile',
    loadComponent: () =>
      import('@/layout/content/mobile/content-mobile.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/pages/shop/mobile/shop-mobile/shop-mobile.component'),
      },
      {
        path: ':category',
        loadComponent: () =>
          import('@/pages/shop/mobile/shop-mobile/shop-mobile.component'),
      },
    ],
  },
];

export const routes: Routes = [...WEB_ROUTES, ...TWA_ROUTES, ...MOBILE_ROUTES];
