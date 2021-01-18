import React, { useState, useEffect } from 'react';
import GA4React from './../lib/ga4manager';
import {
  GA4Config,
  GA4ManagerOptionsInterface,
  GA4ReactResolveInterface,
} from '../models/gtagModels';

export interface IGA4R {
  code: string;
  timeout?: number;
  config?: GA4Config;
  additionalCode?: Array<string>;
  children?: any;
  options?: GA4ManagerOptionsInterface;
}

const outputGA4 = (
  children: any,
  setComponents: Function,
  ga4: GA4ReactResolveInterface
) => {
  setComponents(
    React.Children.map(children, (child: React.ReactChildren, index) => {
      if (!React.isValidElement(child)) {
        return <React.Fragment>{child}</React.Fragment>;
      }

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
    })
  );
};

export const GA4R: React.FC<IGA4R> = ({
  code,
  timeout,
  config,
  additionalCode,
  children,
  options,
}) => {
  const [components, setComponents] = useState<any>(null);

  useEffect(() => {
    if (!GA4React.isInitialized()) {
      const ga4manager = new GA4React(
        `${code}`,
        config,
        additionalCode,
        timeout,
        options
      );
      ga4manager.initialize().then(
        (ga4: GA4ReactResolveInterface) => {
          outputGA4(children, setComponents, ga4);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      const ga4 = GA4React.getGA4React();
      if (ga4) {
        outputGA4(children, setComponents, ga4);
      }
    }
  }, []);

  return <>{components}</>;
};

export default GA4R;
