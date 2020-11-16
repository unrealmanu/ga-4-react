import React, { useState, useEffect } from 'react';
import GA4React from '..';
adimport { GA4ReactResolveInterface } from '../lib/gtagModels';

export interface IGAReactConfig {
  send_page_view: boolean;
  groups: string;
}

export interface IGA4R {
  code: string;
  config?: IGAReactConfig;
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
      (ga4: GA4ReactResolveInterface) => {
        setComponents(
          React.Children.map(children, (child: React.ReactChildren, index) => {
            if (!React.isValidElement(child)) {
              return <React.Fragment>{child}</React.Fragment>;
            } else {
              //@ts-ignore
              if (child.type && typeof child.type.name !== 'undefined') {
                return React.cloneElement(child, {
                  //@ts-ignore
                  ga4: ga4,
                  index,
                });
              } else {
                return child;
              }
            }
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
