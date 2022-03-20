<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing';
  import { links } from 'svelte-routing';
  import GameMenu from './GameMenu.svelte';
  import TestGames from './testgame/TestGames.svelte';
  import TestGame from './testgame/TestGame.svelte';
  import Sudokus from './sudoku/Sudokus.svelte';
  import Sudoku from './sudoku/Sudoku.svelte';

  export let url: string = '/';
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <div use:links>
      <Route path="/"><GameMenu /></Route>
      <Route path="/testgames"><TestGames /></Route>
      <Route path="/testgame/:id" let:params><TestGame {...params} /></Route>
      <Route path="/sudokus"><Sudokus /></Route>
      <Route path="/sudoku/:id" let:params><Sudoku {...params} /></Route>
    </div>
  </Router>
</main>

<style>
  div {
    padding: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  main {
    width: 100%;
    height: 100%;
    padding: 0px;
    display: block;
  }
  * {
    background-color: #282828;
    color: white;
    border-color: white;
    padding: 10px;
    text-decoration: none;
  }
</style>
