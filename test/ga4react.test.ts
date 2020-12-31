import { GA4ReactInterface } from '../dist/lib/gtagModels';
import GA4React from '../dist/index';
import '@testing-library/jest-dom/extend-expect';

describe('ga4react', () => {
  it('initialized', async done => {
    const ga4react: GA4ReactInterface = new GA4React('CODE');
    const ga4promise = ga4react.initialize().then(
      ga4 => {
        expect(ga4promise).toBeInstanceOf(Promise);
        expect(ga4).toMatchSnapshot();
        done();
      },
      err => {
        console.error(err);
      }
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
  });
});
