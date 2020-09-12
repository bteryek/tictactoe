import { CellValue } from './CellType';
import { Player } from './useGameState';
import _, { max } from 'lodash';
import Cell from '../Cell';

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
	const maxTopStartCheckLeft = gridSize - 3;
	const maxRowsFromTop = gridSize - 3;
	const maxTopStartCheckRight = gridSize - maxTopStartCheckLeft - 1;

	const maxBottomStartCheckLeft = gridSize * gridSize - 3;
	const maxBottomStartCheckRight = gridSize * gridSize - (gridSize - 3 + 1);
	const maxRowsFromBottom = gridSize - 3 + 1;

	// console.log('max rows', maxRowsFromTop, maxRowsFromBottom);

	// console.log(
	// 	`diagonal check: gridSize ${gridSize} maxTopStartCheckLeft ${maxTopStartCheckLeft} maxTopStartCheckRight: ${maxTopStartCheckRight}`
	// );

	// console.log(
	// 	`diagonal check: maxBottomStartCheckLeft ${maxBottomStartCheckLeft} maxBottomStartCheckRight: ${maxBottomStartCheckRight}`
	// );

	for (let r = 0; r < gridSize; r++) {
		for (let c = 0; c < gridSize; c++) {
			// check left to right first
			const currentIndex = r * gridSize + c;

			// console.log(`current index: ${currentIndex} - r: ${r} c: ${c}`);

			const leftToRightOne = currentIndex;
			const leftToRightTwo = currentIndex + gridSize + 1;
			const leftToRightThree = currentIndex + gridSize * 2 + 2;

			const leftToRightSequence = [
				grid[leftToRightOne],
				grid[leftToRightTwo],
				grid[leftToRightThree],
			];

			// check right to left
			// console.log(
			// 	`current index: ${currentIndex} one: ${leftToRightOne} two: ${leftToRightTwo} three: ${leftToRightThree}`
			// );
			// console.log('seq', sequence);

			if (
				leftToRightSequence.every(
					(x) =>
						x === leftToRightSequence[0] &&
						leftToRightSequence[0] !== CellValue.Empty
				)
			) {
				// console.log('ltr');
				return {
					winner: true,
					isDraw: false,
					player:
						grid[leftToRightOne] === CellValue.X ? Player.Human : Player.Robot,
					sequence: [leftToRightOne, leftToRightTwo, leftToRightThree],
					orientation: Orientation.Diagonal,
				};
			}

			const rightToLeftOne = currentIndex;
			const rightToLeftTwo = currentIndex + gridSize - 1;
			const rightToLeftThree = currentIndex + gridSize * 2 - 2;

			const rightToLeftSequence = [
				grid[rightToLeftOne],
				grid[rightToLeftTwo],
				grid[rightToLeftThree],
			];

			// console.log('rtl seq', rightToLeftOne, rightToLeftTwo, rightToLeftThree);

			if (
				rightToLeftSequence.every(
					(x) =>
						x === rightToLeftSequence[0] &&
						rightToLeftSequence[0] !== CellValue.Empty
				)
			) {
				// console.log('rtl', rightToLeftSequence);

				return {
					winner: true,
					isDraw: false,
					player:
						grid[rightToLeftOne] === CellValue.X ? Player.Human : Player.Robot,
					sequence: [rightToLeftOne, rightToLeftTwo, rightToLeftThree],
					orientation: Orientation.Diagonal,
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
