<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Cell } from '../data/cell';

  export let rows: number = 9;
  export let columns: number = 9;
  export let style: string;

  let internalStyle = `grid-template-columns: repeat(${columns}, 1fr);
               grid-template-rows: repeat(${rows}, 1fr);
               border: 0.25px solid;`;

  const dispatch = createEventDispatcher();

  function onCellClick(cell: Cell<any>) {
    dispatch('cellClick', {
      cell: cell,
    });
  }
</script>

<span style={style + internalStyle}>
  <slot />
</span>

<style>
  span {
    display: inline-grid;
  }
</style>
