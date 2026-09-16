import ReactGA from 'react-ga4';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let initialized = false;

export const initAnalytics = () => {
  if (initialized || !MEASUREMENT_ID) return;
  ReactGA.initialize(MEASUREMENT_ID);
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  initialized = true;
};

export const trackEvent = (action: string, label?: string) => {
  if (!initialized) return;
  ReactGA.event({ category: 'engagement', action, label });
};
