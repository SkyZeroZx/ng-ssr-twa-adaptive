import { ContextService } from '@/services/context';
import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const canMatchDeviceMobile: CanMatchFn = () => {
  const contextService = inject(ContextService);

  return contextService.isMobile();
};

export const canMatchDeviceDesktop: CanMatchFn = () => {
  const contextService = inject(ContextService);
  return contextService.isDesktop();
};

export const canMatchDeviceTWA: CanMatchFn = () => {
  const contextService = inject(ContextService);
  return contextService.isTWA();
};
