<script lang="ts">
  import { onMount } from 'svelte';
  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from '../components/Board.svelte';
  import type { Sudoku } from '../data/sudoku';
  import { SudokuRepository } from '../repository/sudoku';
  import { SudokuChecker } from '../validation/sudokuchecker';

  export let repo = new SudokuRepository();
  export let id: number;

  let game: Sudoku.Sudoku;
  let solver: SudokuSolver;
  let checker: SudokuChecker;
  let showCandidates = true;
  let boardStyle = 'height: 100%; width: 49%; vertical-align: center;';
  let howAmIDoing = '';
  let selectedNum = 1;

  onMount(async () => {
    game = await repo.GetOne(id);
    checker = new SudokuChecker(game.board);
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

  function Check() {
    howAmIDoing = '...checking';
    setTimeout(() => {
      if (checker.Check()) {
        howAmIDoing = 'Great!';
      }
      else {
        howAmIDoing = 'Errors Found';
      }
      setTimeout(Clear, 1000);
    }, 1000);
  }

  function Clear() {
    howAmIDoing = '';
  }

  function UpdateSelectedNum({ key }) {
    if (isNaN(+key)) return;
    if (+key > 9 || +key < 1) return;
    selectedNum = +key;
    console.log(typeof selectedNum);
  }

  function onCellClick(cell) {
    cell.Value = selectedNum;
    game.board = game.board;
  }
</script>

<svelte:window on:keydown={UpdateSelectedNum} />

{#if game}
  <div>
    <div >
      <Board style={boardStyle}>
        {#each game.board.flat() as cell, idx}
          <td class="solved" data-testid="Board{Math.floor(idx / 9)}{idx % 9}"
          on:click={() => onCellClick(cell)}>
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
    <p style="font-size: 40px" >
      {#each Array.from(Array(9).keys()).map(x => x+1) as num, idx}
        <span class:selected={num == selectedNum} 
        class="numpad" 
        on:click={() => UpdateSelectedNum({ key: `${num}`})}>
          {num}
        </span>
          {#if (idx + 1) % 3 == 0}<br />{/if}
      {/each}
    </p>
  </div>
  <div>
    <button on:click={Solve}>Solve</button>
    <button on:click={Hint}>Hint</button>
    <button on:click={Check}>How Am I Doing?</button>
    {#if howAmIDoing} {howAmIDoing} {/if}
    <input type="checkbox" bind:checked={showCandidates} />
    Show Ai Table
  </div>
{:else}
  <p>...loading</p>
{/if}

<style>
  span.selected {
    color: black;
    background: orange;
  }
  span.numpad {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 50%;
    border: 1px red;
  }
  div {
    display: inline;
    align-content: center;
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
