import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, REQUEST } from '@angular/core';

export const isMobile = (userAgent: string) => {
  const mobileKeywords = [
    'Android',
    'MacIntel',
    'Motorola',
    'Nintendo',
    'iPhone',
    'iPad',
    'iPod',
    'Windows Phone',
    'BlackBerry',
    'Mobile',
  ];
  return mobileKeywords.some((keyword) => userAgent?.includes(keyword));
};

@Injectable({
  providedIn: 'root',
})
export class DetectDeviceService {
  private userAgent: string;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(REQUEST, { optional: true });

  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.userAgent = this.request?.headers.get('user-agent') ?? '';
    } else {
      this.userAgent = navigator.userAgent;
    }
  }

  isMobile() {
    return isMobile(this.userAgent);
  }
}
