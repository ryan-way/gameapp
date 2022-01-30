<script lang="ts">
  import { getContext } from 'svelte';
  import Board from './Board.svelte';
  import type { ITestEntity } from './ipc/entity/ITestEntity';
  import { Window, key } from './window';

  export let id: number;

  const data: Window = getContext(key);
  let game: Promise<ITestEntity> = data.db.getTestEntity(id);

  let turn: 'X' | 'O' = 'X';
  let name: string = 'Ryan';

  function onClick(x: number, y: number) {
    game = game.then(entity => {
      if (entity.board[x][y] != ' ') return entity;

      entity.board[x][y] = turn;
      turn = turn == 'X' ? 'O' : 'X';
      return entity;
    });
  }
</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <Board 
    fontSize="120px" heigh="500px" width="500px"
    data={entity.board}
  />
{/await}

<style>
</style>
