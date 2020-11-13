import React, { useEffect, useState } from 'react';
import GA4React from './ga4manager';

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
  const [ga4fn, setGA4Fn] = useState<any>();

  useEffect(() => {
    const ga4manager = new GA4React(`${code}`, config, additionalCode);
    ga4manager.initialize().then(
      ga4 => {
        setGA4Fn(ga4);
      },
      err => {
        console.error(err);
      }
    );
  }, []);

  const childrenWithProps = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ga4: ga4fn,
      index,
    });
  });

  return <div>{childrenWithProps}</div>;
};

export default GA4React;
