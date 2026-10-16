/**
 * Global website configuration.
 * Change SITE_URL here or set VITE_SITE_URL in your environment (.env / hosting provider)
 * to update the canonical site address.
 */
export const SITE_URL: string = (
  import.meta.env.VITE_SITE_URL || 'https://muhammadjawadfareed.netlify.app'
).replace(/\/+$/, '')
