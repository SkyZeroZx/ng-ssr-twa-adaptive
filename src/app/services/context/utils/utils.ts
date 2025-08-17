import { environment } from '../../../../environments/environment';

export function isAndroidAppReferer(referer: string | undefined): boolean {
  return referer?.includes('android-app') ?? false;
}


export function getCookies(
  cookies: string | undefined
): Record<string, string> {
  if (!cookies) {
    return {};
  }

  return Object.fromEntries(
    cookies.split(';').map((cookie) => {
      const [name, ...rest] = cookie.trim().split('=');
      return [name, decodeURIComponent(rest.join('='))];
    })
  );
}

export function getContextFromURL(url: string): string | null {
  if (!url) {
    return null;
  }

  try {
    return new URL(`${environment.WEB_URL}/${url}`).searchParams.get('ctx');
  } catch {
    return null;
  }
}
