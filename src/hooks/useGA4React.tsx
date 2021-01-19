import { useState, useEffect } from 'react';
import GA4React from '../lib/ga4manager';

import {
  GA4Config,
  GA4ManagerOptionsInterface,
  GA4ReactResolveInterface,
} from '../models/gtagModels';

export const useGA4React = (
  gaCode?: string,
  gaConfig?: GA4Config | object,
  gaAdditionalCode?: Array<string>,
  gaTimeout?: number,
  options?: GA4ManagerOptionsInterface
): GA4ReactResolveInterface | void => {
  const [ga4, setGA4] = useState<GA4ReactResolveInterface | void>(undefined);
  useEffect(() => {
    if (gaCode) {
      switch (GA4React.isInitialized()) {
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
              setGA4(ga4);
            },
            (err: Error) => {
              console.error(err);
            }
          );
          break;
        case true:
          setGA4(GA4React.getGA4React());
          break;
      }
    } else {
      setGA4(GA4React.getGA4React());
    }
  }, [gaCode]);
  return ga4;
};
