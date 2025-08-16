export const environment = {
  API: 'https://dummyjson.com',
  WEB_URL: 'http://localhost:4200',
  twaConfig: {
    production: false,
  },
  httpCache: {
    /**
     * maxAge of cache in milliseconds
     */
    maxAge: 60_0000,
    /**
     * max cacheCount for different parameters
     * maximum allowed unique caches (different parameters)
     */
    maxCacheCount: 100,
  },
};
