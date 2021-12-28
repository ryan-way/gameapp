import './global.css';
import App from './App.svelte';
import type { Window } from './window';

const app = new App({
  target: document.body,
  props: {
    name: 'world',
  },
});

const win: Window = window as unknown as Window;

console.log('Entities', win.db.getTestEntities());
export default app;
