import React, { useEffect } from 'react';
import GA4React from '../lib/ga4manager';

import {
  GA4Config,
  GA4ManagerOptionsInterface,
  GA4ReactResolveInterface,
} from '../models/gtagModels';

export interface GA4WithTrackerComponentInterface {
  path: string | Location;
  location?: string | Location;
  title?: string;
  gaCode?: string;
  gaConfig?: GA4Config | object;
  additionalCode?: Array<string>;
  timeout?: number;
  options?: GA4ManagerOptionsInterface;
}

export function withTracker(
  MyComponent: React.FC<any>
): React.FC<GA4WithTrackerComponentInterface> {
  return (props: GA4WithTrackerComponentInterface & any) => {
    const {
      path,
      location,
      title,
      gaCode,
      gaTimeout,
      gaConfig,
      gaAdditionalCode,
      options,
    } = props;
    useEffect(() => {
      switch (GA4React.isInitialized()) {
        case true:
          const ga4 = GA4React.getGA4React();
          if (ga4) {
            ga4.pageview(path, location, title);
          }
          break;
        default:
        case false:
          const ga4react = new GA4React(
            `${gaCode}`,
            gaConfig,
            gaAdditionalCode,
            gaTimeout,
            options
          );
          ga4react.initialize().then(
            (ga4: GA4ReactResolveInterface) => {
              ga4.pageview(path, location, title);
            },
            (err: Error) => {
              console.error(err);
            }
          );
          break;
      }
    });
    return <MyComponent {...props} />;
  };
}

export default withTracker;
