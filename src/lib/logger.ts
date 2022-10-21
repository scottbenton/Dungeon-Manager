import { LOGGER_KEY } from '@/config/logger';
import posthog, { Properties } from 'posthog-js';

posthog.init(LOGGER_KEY, {
  api_host: 'https://app.posthog.com',
  loaded: (instance) => {
    // I want to identify sessions for bug tracking, not individual users.
    // The date / time the session started should be enough.
    instance.identify(new Date().toUTCString());
  },
  persistence: 'memory',
});

export const Logger = {
  debug: (eventKey: string, properties?: Properties) => {
    posthog.capture(`Debug: ${eventKey}`, properties);
  },

  log: (eventKey: string, properties?: Properties) => {
    posthog.capture(`Log: ${eventKey}`, properties);
  },

  error: (eventKey: string, properties?: Properties) => {
    posthog.capture(`Error: ${eventKey}`, properties);
  },
};
