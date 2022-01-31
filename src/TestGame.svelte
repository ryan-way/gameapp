<script lang="ts">
  import { getContext } from 'svelte';
  import Board from './Board.svelte';
  import type { ICell } from './ICell';
  import type { ITestEntity } from './ipc/entity/ITestEntity';
  import { Window, key } from './window';

  export let id: number;

  const data: Window = getContext(key);
  let game: Promise<ITestEntity> = data.db.getTestEntity(id);

  let turn: 'X' | 'O' = 'X';
  let name: string = 'Ryan';

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
