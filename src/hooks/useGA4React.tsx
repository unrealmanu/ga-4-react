import { useState, useEffect } from 'react';
import GA4React from '..';
import { GA4ReactResolveInterface } from '../lib/gtagModels';

export const useGA4React = (
  gaCode?: string
): GA4ReactResolveInterface | void => {
  const [ga4, setGA4] = useState(!gaCode ? GA4React.getGA4React() : undefined);
  useEffect(() => {
    if (!GA4React.isInitialized() && gaCode) {
      const ga4react = new GA4React(gaCode);
      ga4react.initialize().then(
        (ga4: GA4ReactResolveInterface) => {
          setGA4(ga4);
        },
        (err: Error) => {
          console.error(err);
        }
      );
    }
  });
  return ga4;
};

export default useGA4React;
