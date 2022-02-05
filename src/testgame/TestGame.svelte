<script lang="ts">
  import { getContext } from 'svelte';
  import Board from '../common/Board.svelte';
  import type { ICell } from '../ipc/Cell';
  import type { ITestEntity } from '../ipc/entity/ITestEntity';
  import { IDatabase, key as dbKey } from "../ipc/service/database";

  export let id: number;

  const db: IDatabase = getContext(dbKey);
  let game: Promise<ITestEntity> = db.getTestEntity(id);

  let turn: 'X' | 'O' = 'X';
  
  function onClick(cell: ICell) {
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
