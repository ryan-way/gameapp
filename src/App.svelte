<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import { setContext } from 'svelte';
  import { Window, key as windowKey } from './window';
  import GameMenu from './GameMenu.svelte';
  import TestGames from './TestGames.svelte';

  export let window: Window;
  export let url: string = '/';

  setContext(windowKey, window);
</script>

<main>
  <Router {url}>
    <Link to="/">Home</Link>
    <div>
      <Route path="/"><GameMenu /></Route>
      <Route path="/testgames"><TestGames /></Route>
      <Route path="/testgame/:id"><TestGame /></Route>
    </div>
  </Router>
</main>
