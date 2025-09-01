import { RouterStateSnapshot, ViewTransitionInfo } from '@angular/router';

const ALLOWED_TRANSITIONS = new Set([
  '/->/product',
  '/product->/',
  '/->/product',
  '/product->/',
]);

function isTransitionAllowed(from: string, to: string): boolean {
  const fromRoute = from.startsWith('/product')
    ? '/product'
    : from.startsWith('/')
    ? '/'
    : from;
  const toRoute = to.startsWith('/product')
    ? '/product'
    : to.startsWith('/')
    ? '/'
    : to;
  return ALLOWED_TRANSITIONS.has(`${fromRoute}->${toRoute}`);
}

export function onViewTransitionCreated(
  viewTransitionInfo: ViewTransitionInfo
) {
  const to =
    ((viewTransitionInfo.to as any)['_routerState'] as RouterStateSnapshot)
      ?.url ?? '';
  const from =
    ((viewTransitionInfo.from as any)['_routerState'] as RouterStateSnapshot)
      ?.url ?? '';

  if (!isTransitionAllowed(from, to)) {
    viewTransitionInfo.transition.skipTransition();
  }
}
