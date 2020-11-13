import { JSDOM } from 'jsdom';
import { GA4React, GA4ReactInterface } from './../dist/index';

const { window } = new JSDOM(
  `<!DOCTYPE html><html><head></head><body></body></html>`,
  {
    runScripts: 'dangerously',
  }
);

const { document } = window;

Object.assign(window, { gtag: () => {} });

jest.mock('./../src/index', () => ({
  global: window,
  document: document,
}));

describe('ga4react', () => {
  it('works', () => {
    const ga4react: GA4ReactInterface = new GA4React('CODE');
    const ga4promise = ga4react.initialize();
    expect(ga4promise).toBeInstanceOf(Promise);
  });
});
