import GA4R from 'ga-4-react/dist/components/GA4RComponents';
import { GA4ReactResolveInterface } from 'ga-4-react/dist/lib/gtagModels';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const ExampleChild: React.FC<{
  ga4?: GA4ReactResolveInterface;
  children?: any;
}> = ({ ga4, children }) => {
  useEffect(() => {
    console.log('ga4', ga4);
  }, []);

  return <div>{children}</div>;
};

export const ExampleContainer: React.FC = () => {
  return (
    <div>
      <GA4R code="GA-CODE">
        <ExampleChild>Valid element to inject GA4</ExampleChild>
        <div>is not possibile to inject GA4 in html element</div>
      </GA4R>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ExampleContainer />
  </React.StrictMode>,
  document.getElementById('root')
);