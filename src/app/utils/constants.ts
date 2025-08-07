export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);


export const CLIENT_SIDE_NEXT_PUBLIC_HOSTNAME = isBrowser
  ? (window.document.documentElement.dataset.publicHost ??
    'http://localhost:8001')
  : '';

export const CLIENT_SIDE_NEXT_PUBLIC_PREFIX = isBrowser
  ? (window.document.documentElement.dataset.prefix ?? '')
  : '';