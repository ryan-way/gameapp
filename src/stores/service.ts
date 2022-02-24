import { derived, writable, readable } from 'svelte/store';
import type { Window } from '../renderer/window';
import type { IDatabase } from '../service/database';
import type { ILogger } from '../service/logger';

export const service = readable<Window>(window as unknown as Window);
export const overrides = {
  log: writable<ILogger>(null),
  data: writable<IDatabase>(null),
};
export const log = derived(
  [service, overrides.log],
  ([service, log]) => log ?? service.log
);
export const data = derived(
  [service, overrides.data],
  ([service, data]) => data ?? service.data
);
