import { useState, useLayoutEffect } from 'react';
import GA4React from '..';
import { GA4ReactResolveInterface } from '../lib/gtagModels';

export const useGA4React = (
  gaCode?: string
): GA4ReactResolveInterface | void => {
  const [ga4, setGA4] = useState<any>();
  useLayoutEffect(() => {
    if (gaCode) {
      switch (GA4React.isInitialized()) {
        case false:
          const ga4react = new GA4React(gaCode);
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
