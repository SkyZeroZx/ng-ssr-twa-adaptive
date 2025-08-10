import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { DetectDeviceService } from '../../services/detect-device/detect-device.service';
import { ContextService } from '../../services/context/token/context.token';

export const canMatchDeviceMobile: CanMatchFn = () => {
  const detectDeviceService = inject(DetectDeviceService);
  const isMobile = detectDeviceService.isMobile();
  const contextService = inject(ContextService);

  return isMobile && !contextService.isTWA();
};

export const canMatchDeviceDesktop: CanMatchFn = () => {
  const detectDeviceService = inject(DetectDeviceService);
  const isMobile = detectDeviceService.isMobile();
  const contextService = inject(ContextService);

  return !isMobile && !contextService.isTWA();
};

export const canMatchDeviceTWA: CanMatchFn = () => {
  const contextService = inject(ContextService);

  return contextService.isTWA();
};
