import './global.css';
import App from './App.svelte';
import type { Window } from './window';
import type { ITestEntity } from './ipc/entity/ITestEntity';

const win: Window = window as unknown as Window;
const app = new App({
  target: document.body,
  props: {
    name: 'world',
    promise: win.db.getTestEntities(),
  },
});

export default app;
