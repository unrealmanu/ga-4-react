import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { GA4R } from './../src/index';

Object.defineProperty(global.document, 'readyState', {
  get() {
    return 'interactive';
  },
});

beforeAll(() => {
  global.document.head.innerHTML = '';
});

describe('GA4R Components', () => {
  it('Rendering with Children', async done => {
    const Test: React.FC<any> = ({ ga4 }) => {
      return <>{JSON.stringify(ga4)}</>;
    };

    const { container } = render(
      <GA4R
        code="GA-CODE"
        options={{ nonce: ['nonce-string0', 'nonce-string1'] }}
      >
        <Test></Test>
        <div>Try</div>
      </GA4R>
    );

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const target = global.document.head.querySelector('script');
      if (target) {
        target.dispatchEvent(LoadEvent);
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });

  it('Rendering with invalid Children', async done => {
    const { container } = render(
      <GA4R code="GA-CODE">im not valid children element</GA4R>
    );

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const target = global.document.head.querySelector('script');
      if (target) {
        target.dispatchEvent(LoadEvent);
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });

  it('Rendering without Children', async done => {
    const { container } = render(<GA4R code="GA-CODE"></GA4R>);

    setTimeout(() => {
      global.document.dispatchEvent(new Event('readystatechange'));
    }, 100);

    setTimeout(() => {
      const LoadEvent = document.createEvent('HTMLEvents');
      LoadEvent.initEvent('load', true, true);
      const target = global.document.head.querySelector('script');
      if (target) {
        target.dispatchEvent(LoadEvent);
      }
    }, 1000);

    setTimeout(() => {
      expect(container.innerHTML).toMatchSnapshot();
      expect(global.document.head).toMatchSnapshot();
      done();
    }, 2000);
  });
});
