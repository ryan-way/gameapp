<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';
  import { setContext } from 'svelte';
  import { Window, key as windowKey } from './window';
  import GameMenu from './GameMenu.svelte';
  import TestGameBuilder from './TestGameBuilder.svelte';

  export let window: Window;
  export let url: string = '/';

  setContext(windowKey, window);
</script>

<main>
  <Router {url}>
    <div>
      <Route path="/"><GameMenu /></Route>
      <Route path="/TestGame"><TestGameBuilder /></Route>
    </div>
  </Router>
</main>
