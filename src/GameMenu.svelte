<script lang="ts">
  import { Link } from 'svelte-routing';
  interface IGame {
    name: string;
    link: string;
  }

  let games: IGame[] = [
    { name: 'Test Game', link: '/testgames' },
    { name: 'Sudoku', link: '/sudokus' },
  ];
</script>

<ul>
  {#each games as { name, link }}
    <li><Link to={link}>{name}</Link></li>
  {/each}
</ul>

<style>
</style>
