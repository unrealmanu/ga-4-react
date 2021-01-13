import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { GA4React, useGA4React } from '../src/index';

Object.defineProperty(global.document, 'readyState', {
  get() {
    return 'interactive';
  },
});

beforeAll(() => {
  global.document.head.innerHTML = '';
  const init = new GA4React('GA-CODE');
  init.initialize();
});

const Example = () => {
  const ga4React = useGA4React();
  return <>{JSON.stringify(ga4React)}</>;
};

describe('GA4R hook', () => {
  it('Rendering with useGa4React without gaCode', async done => {
    const { container } = render(<Example />);

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const targets = global.document.head.querySelectorAll('script');
      if (targets) {
        targets.forEach(target => target.dispatchEvent(LoadEvent));
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });
});
