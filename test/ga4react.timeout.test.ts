import { GA4ReactInterface } from '../dist/lib/gtagModels';
import { GA4React } from '../dist/index';
import '@testing-library/jest-dom/extend-expect';

describe('ga4react', () => {
  it('initialized with very short timeout, and without body event dispatch', async done => {
    const ga4react: GA4ReactInterface = new GA4React('CODE', {}, [], 10);
    ga4react.initialize().then(
      () => {},
      err => {
        expect(err).toBeInstanceOf(Error);
        done();
      }
    );
  });
});
