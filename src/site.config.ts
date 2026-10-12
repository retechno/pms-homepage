/**
 * Everything on the page that points outside it. Values come from the environment
 * (see .env.example). An empty value hides the link it would feed, so the page never
 * shows a link that goes nowhere.
 */
const env = import.meta.env

function clean(value: string | undefined): string | null {
  const v = (value ?? '').trim()
  return v === '' ? null : v.replace(/\/$/, '')
}

const appUrl = clean(env.VITE_APP_URL)

export const site = {
  name: 'KamaraPMS',
  loginUrl: appUrl ? `${appUrl}/login` : null,
  demoEndpoint: clean(env.VITE_DEMO_ENDPOINT),
  salesEmail: clean(env.VITE_SALES_EMAIL),
  privacyUrl: clean(env.VITE_PRIVACY_URL),
  termsUrl: clean(env.VITE_TERMS_URL),
}

export type Site = typeof site
