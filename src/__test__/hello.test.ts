/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import App from '../App.svelte';

test('should render', () => {
  const results = render(App, {
    window: {
      data: {},
      log: {},
    },
  });

  expect(() => results.getByText('Sudoku')).not.toThrow();
});
