<script lang='ts'>
  import { getContext } from 'svelte';
import Board from '../Board.svelte';
import type { ISudokuEntity } from '../ipc/entity/ISudokuEntity';
  import { Window, key } from '../window';

  export let id: number;

  const data: Window = getContext(key);
  let game: Promise<ISudokuEntity> = data.db.getSudokuEntity(id);

</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <Board 
    fontSize="40px" height="500px" width="500px"
    data={entity.board}
  />
{/await}

<style></style>