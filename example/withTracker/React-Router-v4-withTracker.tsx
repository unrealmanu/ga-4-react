import React, { useEffect } from 'react';

/**
 * Originally from ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 * (Implemented for ga-4-react by Cristian Custodio, review  and integrated by Manuel Trebbi)
 */

import GA4React from 'ga-4-react';
import { GA4ReactResolveInterface } from 'ga-4-react/dist/lib/gtagModels';

import ReactDOM from 'react-dom';

export const Example: React.FC<any> = withTracker((props: any) => {
  return <>Example component</>;
});

export interface GA4WithTrackerComponentInterface {
  path: string | Location;
  location?: string | Location;
  title?: string;
  gaCode?: string;
}

export default function withTracker(
  MyComponent: React.FC<any>
): React.FC<GA4WithTrackerComponentInterface> {
  return (props: GA4WithTrackerComponentInterface & any) => {
    const { path, location, title, gaCode } = props;
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
          const ga4react = new GA4React(gaCode);
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

ReactDOM.render(
  <React.StrictMode>
    <Example
      path={'custom pathname'}
      gaCode="INSERT HERE YOUR GA CODE"
    ></Example>
  </React.StrictMode>,
  document.getElementById('root')
);
