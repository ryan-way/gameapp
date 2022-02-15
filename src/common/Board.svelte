<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Cell } from '../data/cell';

  export let data: Cell<any>[][];
  export let fontSize: string;
  export let height: string;
  export let width: string;

  const dispatch = createEventDispatcher();

  function onCellClick(cell: Cell<any>) {
    console.log('Board', cell);
    dispatch('cellClick', {
      cell: cell,
    });
  }
</script>

<table style="font-size: {fontSize}; height: {height}; width: {width};">
  {#each data as row}
    <tr>
      {#each row as cell}
        <td on:click={() => onCellClick(cell)}>{cell.Value}</td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  table,
  td {
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
