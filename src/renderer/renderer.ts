import './global.css';
import App from '../App.svelte';
import type { Window } from './window';
import { service } from '../service';

service.set(window as unknown as Window);
const app = new App({
  target: document.body,
});

export default app;
