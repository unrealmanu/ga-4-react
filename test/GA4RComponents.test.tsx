import React from 'react';
import { render } from '@testing-library/react';
import { GA4R } from './../src/components/GA4RComponents';

describe('GA4R Components', () => {
  it('render', async done => {
    const { container } = render(
      <GA4R code="GA-CODE">
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
