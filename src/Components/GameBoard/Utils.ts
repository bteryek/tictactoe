import { CellValue } from './CellType';
import { Player } from './useGameState';
import _ from 'lodash';

export const buildGrid = (gridSize: number): CellValue[] => {
	const grid = [];
	for (let i = 0; i < gridSize * gridSize; i++) {
		grid.push(CellValue.Empty);
	}
	return grid;
};

export const isEmpty = (grid: CellValue[]): boolean =>
	grid.every((cell) => cell === CellValue.Empty);

export const isFull = (grid: CellValue[]): boolean =>
	grid.every((cell) => cell === CellValue.O || cell === CellValue.X);

export enum Orientation {
	Horizontal = 'horizontal',
	Vertical = 'vertical',
	Diagonal = 'diagonal',
}

export interface GameResult {
	winner: boolean;
	isDraw: boolean;
	player?: Player;
	sequence?: number[];
	orientation?: Orientation;
}

const horizontalWinnerCheck = (grid: CellValue[], gridSize: number) => {
	const start = 0;
	const maxStartCheck = gridSize - 3;
	const rows = _.chunk(grid, gridSize);

	let rowCount = 0;

	for (let i in rows) {
		const row = rows[i];
		for (let c = start; c <= maxStartCheck; c++) {
			const one = c;
			const two = c + 1;
			const three = c + 2;

			const sequence = [row[one], row[two], row[three]];
			if (
				sequence.every(
					(x) => x === sequence[0] && sequence[0] !== CellValue.Empty
				)
			) {
				const oneCellIndex = one + gridSize * rowCount;
				const twoCellIndex = two + gridSize * rowCount;
				const threeCellIndex = three + gridSize * rowCount;

				return {
					winner: true,
					isDraw: false,
					player: row[c] === CellValue.X ? Player.Human : Player.Robot,
					sequence: [oneCellIndex, twoCellIndex, threeCellIndex],
					orientation: Orientation.Horizontal,
				};
			}
		}
		rowCount++;
	}
	return null;
};

const verticalWinnerCheck = (grid: CellValue[], gridSize: number) => {
	const maxEndColumn = (gridSize - 3) * gridSize + gridSize;
	for (let i = 0; i <= maxEndColumn; i++) {
		const one = i;
		const two = i + gridSize;
		const three = i + gridSize * 2;
		const sequence = [grid[one], grid[two], grid[three]];

		if (
			sequence.every(
				(x) => x === sequence[0] && sequence[0] !== CellValue.Empty
			)
		) {
			return {
				winner: true,
				isDraw: false,
				player: grid[one] === CellValue.X ? Player.Human : Player.Robot,
				sequence: [one, two, three],
				orientation: Orientation.Vertical,
			};
		}
	}

	return null;
};

const diagonalWinnerCheck = (grid: CellValue[], gridSize: number) => {
	if (gridSize === 3) {
		const possibleWinners = [
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i in possibleWinners) {
			const sequence = possibleWinners[i];
			const values = sequence.map((index) => grid[index]);

			if (values.every((v) => v === CellValue.X)) {
				return {
					winner: true,
					isDraw: false,
					player: Player.Human,
					sequence,
					orientation: Orientation.Vertical,
				};
			}

			if (values.every((v) => v === CellValue.O)) {
				return {
					winner: true,
					isDraw: false,
					player: Player.Robot,
					sequence,
					orientation: Orientation.Vertical,
				};
			}
		}
	}

	if (gridSize === 4) {
		const possibleWinners = [
			[0, 5, 10],
			[1, 6, 11],
			[4, 9, 14],
			[5, 10, 15],
			[6, 9, 12],
			[2, 5, 8],
			[3, 6, 9],
			[6, 9, 12],
			[7, 10, 13],
		];

		for (let i in possibleWinners) {
			const sequence = possibleWinners[i];
			const values = sequence.map((index) => grid[index]);

			if (values.every((v) => v === CellValue.X)) {
				return {
					winner: true,
					isDraw: false,
					player: Player.Human,
					sequence,
					orientation: Orientation.Vertical,
				};
			}

			if (values.every((v) => v === CellValue.O)) {
				return {
					winner: true,
					isDraw: false,
					player: Player.Robot,
					sequence,
					orientation: Orientation.Vertical,
				};
			}
		}
	}

	return null;
};

export const processGrid = (
	grid: CellValue[],
	gridSize: number
): GameResult => {
	if (isEmpty(grid)) {
		return {
			winner: false,
			isDraw: false,
		};
	}

	// horizontal checks
	const hresult = horizontalWinnerCheck(grid, gridSize);
	if (hresult) return hresult;

	// vertical checks
	const vresult = verticalWinnerCheck(grid, gridSize);
	if (vresult) return vresult;

	// diagonal checks
	const dresult = diagonalWinnerCheck(grid, gridSize);
	if (dresult) return dresult;

	if (isFull(grid)) {
		return {
			winner: false,
			isDraw: true,
		};
	}

	return {
		winner: false,
		isDraw: false,
	};
};
