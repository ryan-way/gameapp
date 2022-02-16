import { derived, writable } from 'svelte/store';
import type { Window } from './renderer/window';

export const service = writable<Window>(null);
export const log = derived(service, $service => $service.log);
export const data = derived(service, $service => $service.data);
