import './global.css';
import App from './App.svelte';
import type { Window } from './window';

const win: Window = window as unknown as Window;
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    promise: win.db.getTestEntities(),
  },
});

export default app;
