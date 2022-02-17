<script lang="ts">
  import { Sudoku, instance } from '../data/sudoku';
  import Board from '../common/Board.svelte';
  import type { IRepository } from '../service/database';
  import { data } from '../service';

  const repo: IRepository<Sudoku.Sudoku> = $data.GetRepository(
    instance
  );
  let games: Promise<Sudoku.Sudoku[]> = repo.GetAll();

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
