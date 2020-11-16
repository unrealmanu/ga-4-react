import React, { useEffect } from 'react';
import GA4R from './../components/GA4RComponents';

export const ExampleChild: React.FC<{ ga4: any }> = ({ ga4 }) => {
  useEffect(() => {
    console.log(ga4);
  }, []);

  return <div></div>;
};

export const ExampleContainer: React.FC = () => {
  return (
    <div>
      <GA4R code="GA-CODE"></GA4R>
    </div>
  );
};
