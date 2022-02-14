<script lang="ts">
  import { getContext } from 'svelte';
  import Board from '../common/Board.svelte';
  import type { Cell } from '../data/cell';
  import { Test } from '../data/test';
  import { IDatabase, IRepository, key } from "../service/database";

  export let id: number;

  const data = getContext(key) as IDatabase;
  const repo: IRepository<Test.Test> = data.GetRepository(new Test.Test());
  let game: Promise<Test.Test> = repo.GetOne(id);

  let turn: 'X' | 'O' = 'X';
  
  function onClick(cell: Cell<any>) {
    console.log('Test Game', cell)
    game = game.then(entity => {
      if (cell.Value != ' ') return entity;

      cell.Value = turn;
      turn = turn == 'X' ? 'O' : 'X';
      return entity;
    });
  }
</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <Board 
    on:cellClick={(event) => onClick(event.detail.cell)}
    fontSize="120px" height="500px" width="500px"
    data={entity.board}
  />
{/await}

<style>
</style>
