import { GA4React as GA4ReactManager } from './lib/ga4manager';

import { GA4R as GA4RComponents } from './components/GA4RComponents';

import { useGA4React as useGA4ReactHook } from './hooks/useGA4React';

import { withTracker as withTrackerFunction } from './components/withTracker';

export const GA4React = GA4ReactManager;

export const GA4R = GA4RComponents;

export const useGA4React = useGA4ReactHook;

export const withTracker = withTrackerFunction;

export default GA4ReactManager;
