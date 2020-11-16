import React from 'react';
import { render } from '@testing-library/react';
import { GA4R } from './../src/components/GA4RComponents';
import { GA4ReactInterface } from '../src/lib/gtagModels';

class GA4React implements GA4ReactInterface {
  constructor(...args: any) {
    console.log(args);
  }
  pageview(path: string) {
    return path;
  }
  event(action: string, label: string, data: string, nonInteraction?: boolean) {
    return { action, label, data, nonInteraction };
  }
  gtag(...args: any) {
    return { ...args };
  }
  ga(...args: any) {
    return { ...args };
  }
  initialize(): Promise<any> {
    return new Promise(resolve => {
      resolve({});
    });
  }
}

jest.mock('./../src/lib/ga4manager', () => {
  return jest.fn().mockImplementation(() => ({
    initialize: () => {
      return new Promise(resolve => {
        resolve({ test: 'test' });
      });
    },
    default: GA4React,
  }));
});

describe('GA4R Components', () => {
  it('render', async done => {
    const Test: React.FC<any> = ({ ga4 }) => {
      return <>{JSON.stringify(ga4)}</>;
    };
    const { container } = render(
      <GA4R code="GA-CODE">
        <Test></Test>
        <div>Try</div>
      </GA4R>
    );

    console.log(container.innerHTML);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      done();
    }, 100);
  });
});
