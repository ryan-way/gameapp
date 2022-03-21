<script lang="ts">
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
    <li><a href={link}>{name}</a></li>
  {/each}
</ul>

<style>
</style>
