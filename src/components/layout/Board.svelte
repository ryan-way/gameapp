<script lang="ts">
  export let rows: number = 9;
  export let columns: number = 9;
  export let border: boolean = false;

  $: internalStyle =
    `grid-template-columns: repeat(${columns}, 1fr);` +
    `grid-template-rows: repeat(${rows}, 1fr);` +
    (border ? `border: 0.25px solid;` : '');
</script>

<div style={internalStyle}>
  <slot />
</div>

<style>
  div {
    display: grid;
  }
</style>
