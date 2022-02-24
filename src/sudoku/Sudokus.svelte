<script lang="ts">
  import Board from '../components/Board.svelte';
  import { SudokuRepository } from '../repository/sudoku';

  const repo = new SudokuRepository();
  let games = repo.GetAll();

  const gameLink: string = '/sudoku/';
</script>

<div>
  {#await games}
    <p>...fetching games</p>
  {:then entities}
    {#each entities as entity}
      <a href={gameLink + entity.id}>
        <p style="text-align: center;">{entity.id}</p>
        <Board data={entity.board} />
      </a>
    {/each}
  {:catch error}
    <p style="color:red">{error.message}</p>
  {/await}
</div>

<style></style>
