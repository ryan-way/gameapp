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
  let showCandidates = true;
  let boardStyle = 'height: 100%; width: 49%; vertical-align: top;';

  onMount(async () => {
    game = await repo.GetOne(id);
    solver = new SudokuSolver(game.board);
    solver.Solve();
  });

  function Solve() {
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[i].length; j++) {
        if (game.board[i][j].Value != ' ') continue;
        game.board[i][j].Value = solver.board[i][j].Value;
      }
    }
  }

  function Hint() {
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[i].length; j++) {
        if (game.board[i][j].Value != ' ') continue;
        game.board[i][j].Value = solver.board[i][j].Value;
        return;
      }
    }
  }

  function Check() {}
</script>

{#if game}
  <div>
    <Board style={boardStyle}>
      {#each game.board.flat() as cell, idx}
        <td class="solved" data-testid="Board{Math.floor(idx / 9)}{idx % 9}">
          {cell.Value}
        </td>
      {/each}
    </Board>
    {#if showCandidates}
      <Board style={boardStyle}>
        {#each solver.Board.flat() as cell}
          <td class="candidate">
            {#each cell.Candidates as candidate, idx}
              {candidate}
              {#if (idx + 1) % 3 == 0}<br />{/if}
            {/each}
          </td>
        {/each}
      </Board>
    {/if}
  </div>
  <div>
    <button on:click={Solve}>Solve</button>
    <button on:click={Hint}>Hint</button>
    <button on:click={Check}>How Am I Doing?</button>
    <input type="checkbox" bind:checked={showCandidates} />
    Show Ai Table
  </div>
{:else}
  <p>...loading</p>
{/if}

<style>
  div {
    align-items: center;
  }
  button {
    align-self: center;
  }
  td {
    display: flex;
    border: 0.25px solid;
    justify-content: center;
    align-items: center;
  }
  td.solved {
    font-size: 40px;
  }
  td.candidate {
    font-size: smaller;
  }
</style>
