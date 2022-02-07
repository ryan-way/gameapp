/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import App from '../App.svelte';
import type { Test } from '../data/test';

test('should render', () => {
  const results = render(App, {
    promise: new Promise<Test.Test[]>((resolve, reject) => {
      return [];
    }),
  });

  expect(() => results.getByText('Hello World!')).not.toThrow();
});
