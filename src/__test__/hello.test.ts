/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import App from '../App.svelte';
import type { ITestEntity } from '../entity/ITestEntity';

test('should render', () => {
  const results = render(App, {
    promise: new Promise<ITestEntity[]>((resolve, reject) => {
      return [];
    }),
  });

  expect(() => results.getByText('Hello World!')).not.toThrow();
});
