<script lang='ts'>
  import { getContext } from 'svelte';
  import { SudokuSolver } from '../ai/sudokusolver'
  import Board from '../common/Board.svelte';
  import { Sudoku } from '../data/sudoku';
  import { IDatabase, IRepository, key } from "../service/database";

  export let id: number;

  const data = getContext(key) as IDatabase;
  const repo: IRepository<Sudoku.Sudoku> = data.GetRepository<Sudoku.Sudoku>(new Sudoku.Sudoku());
  let game: Promise<Sudoku.Sudoku> = repo.GetOne(id);

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