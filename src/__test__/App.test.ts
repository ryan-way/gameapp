/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import App from '../App.svelte';

test('should render App', () => {
  const results = render(App);

  expect(() => results.findByText('Home')).not.toThrow();
});
