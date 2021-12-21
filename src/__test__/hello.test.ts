/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import App from '../App.svelte';

test('should render', () => {
  const results = render(App);

  expect(() => results.getByText('Hello World!')).not.toThrow();
});
