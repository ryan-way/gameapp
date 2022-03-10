<script lang="ts">
  import { onMount } from 'svelte';
  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from '../components/Board.svelte';
  import type { Sudoku } from '../data/sudoku';
  import { SudokuRepository } from '../repository/sudoku';

  export let repo = new SudokuRepository();
  export let id: number;

  let game: Sudoku.Sudoku;
  let solver: SudokuSolver;
  let showCandidates = false;

  onMount(async () => {
    game = await repo.GetOne(id);
    solver = new SudokuSolver(game.board);
  });

  function Solve() {
    solver.Solve();
    solver.board = solver.board;
  }

  function Update() {
    solver.Commit();
    game = game;
  }

  function SolveOne() {
    solver.SolveOne();
    solver.board = solver.board;
  }
</script>

{#if game}
  <span>
    <Board fontSize="40px" height="500px" width="500px" data={game.board}>
      {#each game.board as row}
        {#each row as cell}
          <p>{cell.Value}</p>
        {/each}
      {/each}
    </Board>
    {#if showCandidates}
      <table height="500px" width="500px" class="main">
        {#each solver.Board as row}
          <tr>
            {#each row as cell}
              <td class="main">
                <p>
                  {#each cell.Candidates as candidate, idx}
                    {candidate}
                    {#if (idx+1) % 3 == 0}
                    <br>
                    {/if}
                  {/each}
                </p>
              </td>
            {/each}
          </tr>
        {/each}
      </table>
    {/if}
  </span>
  <div>
    <button on:click={Solve}>Solve</button>
    <button on:click={SolveOne}>Solve One</button>
    <button on:click={Update}>Update</button>
    <input type=checkbox bind:checked={showCandidates} >
    Show Ai Table
  </div>
{:else}
  <p>...loading</p>
{/if}

<style>
  button {
    align-self: center;
  }
  table.main {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: inline-table;
  }
  p {
    margin: 0px;
    font-size: smaller;
  }

  table.main,
  td.main {
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
