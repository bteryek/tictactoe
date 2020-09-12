import { processGrid, isFull } from './../Components/GameBoard/Utils';
import { CellValue } from '../Components/GameBoard/CellType';
import _ from 'lodash';
import { Player } from '../Components/GameBoard/useGameState';

export interface Move {
	row: number;
	col: number;
	index?: number;
}

class AI {
	evaluate = (grid: CellValue[], gridSize: number): number => {
		const result = processGrid(grid, gridSize);
		if (result.winner && result.player === Player.Robot) {
			return +10;
		}
		if (result.winner && result.player === Player.Human) {
			return -10;
		}
		return 0;
	};

	miniMax = (
		cells: CellValue[][],
		depth: number,
		isMax: boolean,
		gridSize: number,
		maxDepth: number
	): number => {
		// console.log('DEPTH', depth);

		const grid = _.flatten(cells);
		const score = this.evaluate(grid, gridSize);

		// If Maximizer has won the game
		// return his/her evaluated score
		if (score === 10) return score;

		// If Minimizer has won the game
		// return his/her evaluated score
		if (score === -10) return score;

		// If there are no more moves and
		// no winner then it is a tie
		if (isFull(grid)) return 0;

		if (depth === maxDepth) {
			return 0;
		}

		if (isMax) {
			let best = -1000;
			for (let r = 0; r < gridSize; r++) {
				for (let i = 0; i < gridSize; i++) {
					const cellType = cells[r][i];
					if (cellType === CellValue.Empty) {
						// make the move
						cells[r][i] = CellValue.O;

						// Call minimax recursively and choose
						// the maximum value
						best = Math.max(
							best,
							this.miniMax(cells, depth + 1, !isMax, gridSize, maxDepth)
						);

						// Undo the move
						cells[r][i] = CellValue.Empty;
					}
				}
			}
			return best;
		} else {
			let best = 1000;
			for (let r = 0; r < gridSize; r++) {
				for (let i = 0; i < gridSize; i++) {
					const cellType = cells[r][i];
					if (cellType === CellValue.Empty) {
						// Make the move
						cells[r][i] = CellValue.X;

						// Call minimax recursively and choose
						// the minimum value
						best = Math.min(
							best,
							this.miniMax(cells, depth + 1, !isMax, gridSize, maxDepth)
						);

						// Undo the move
						cells[r][i] = CellValue.Empty;
					}
				}
			}
			return best;
		}
	};

	findBestMove = (
		grid: CellValue[],
		gridSize: number,
		maxDepth: number = 1
	): Move => {
		console.log('find best moved called!');
		const cells = _.chunk(grid, gridSize);

		// console.log('rows', cells);

		let bestVal = -1000;
		let bestMove: Move = {
			row: -1,
			col: -1,
		};

		for (let r = 0; r < gridSize; r++) {
			for (let i = 0; i < gridSize; i++) {
				const cellType = cells[r][i];
				// console.log(`cell[${r},${i}] :: value: ${cells[r][i]}`);
				if (cellType === CellValue.Empty) {
					// make the move
					cells[r][i] = CellValue.O;
					const moveVal = this.miniMax(cells, 0, false, gridSize, maxDepth);

					// Undo the move
					cells[r][i] = CellValue.Empty;

					// If the value of the current move is
					// more than the best value, then update
					// best/
					if (moveVal > bestVal) {
						bestMove.row = r;
						bestMove.col = i;
						bestMove.index = gridSize * r + i;
						bestVal = moveVal;
					}
				}
			}
		}

		// console.log(
		// 	`Best move value is: row: ${bestMove.row} col: ${bestMove.col} `
		// );

		return bestMove;
	};
}

const instance = new AI();

export default instance;
