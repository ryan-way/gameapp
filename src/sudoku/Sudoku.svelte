<script lang='ts'>
  import { getContext } from 'svelte';
  import { SudokuSolver } from '../ai/SudokuSolver';
  import Board from '../Board.svelte';
  import type { ISudokuEntity } from '../ipc/entity/ISudokuEntity';
  import { Window, key } from '../window';

  export let id: number;

  const data: Window = getContext(key);
  let game: Promise<ISudokuEntity> = data.db.getSudokuEntity(id);
  

  let solver: SudokuSolver;
  game.then(entity => {
    solver = new SudokuSolver(entity.board);
  })

  function SolveOne() {
    game = game.then(entity => {
      console.log("Solving One...")
      if(solver.SolveOne()) {
        console.log('Solved one');
      }
      return entity;
    })
  }
</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <Board 
    fontSize="40px" height="500px" width="500px"
    data={entity.board}
  />

  <button on:click={SolveOne}>Solve</button>
{/await}

<style>
  button {
    align-self: center;
  }
</style>