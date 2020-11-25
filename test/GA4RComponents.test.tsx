import React from 'react';
import TestRenderer from 'react-test-renderer';
import { GA4R } from './../src/index';

import { JSDOM } from 'jsdom';
const dom = new JSDOM();
global.document = dom.window.document;
Object.defineProperty(global, 'window', dom.window);

describe('GA4R Components', () => {
  it('render', async done => {
    const Test: React.FC<any> = ({ ga4 }) => {
      return <>{JSON.stringify(ga4)}</>;
    };

    const testRenderer = TestRenderer.create(
      <GA4R code="GA-CODE">
        <Test></Test>
        <div>Try</div>
      </GA4R>
    );

    setTimeout(() => {
      expect(testRenderer.toJSON()).toMatchSnapshot();
      done();
    }, 500);
  });
});
