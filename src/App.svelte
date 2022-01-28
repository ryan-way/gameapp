<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import { setContext } from 'svelte';
  import { Window, key as windowKey } from './window';
  import GameMenu from './GameMenu.svelte';
  import TestGames from './TestGames.svelte';
  import TestGame from './TestGame.svelte';

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
      <Route path="/testgame/:id" let:params><TestGame {...params} /></Route>
    </div>
  </Router>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
  * {
    background-color: #282828;
    color: white;
    border-color: white;
    padding: 10px;
    text-decoration: none;
  }
</style>
