import React, { useState, useEffect } from 'react';
import GA4React from '..';
import { ga4Config } from '../lib/gtagModels';

export interface IGA4R {
  code: string;
  config?: ga4Config | object;
  additionalCode?: Array<string>;
  children?: any;
}

export const GA4R: React.FC<IGA4R> = ({
  code,
  config,
  additionalCode,
  children,
}) => {
  const [components, setComponents] = useState<any>(children);

  useEffect(() => {
    const ga4manager = new GA4React(`${code}`, config, additionalCode);
    ga4manager.initialize().then(
      ga4 => {
        setComponents(
          React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              ga4: ga4,
              index,
            });
          })
        );
      },
      err => {
        console.error(err);
      }
    );
  }, []);

  return <>{components}</>;
};

export default GA4R;
