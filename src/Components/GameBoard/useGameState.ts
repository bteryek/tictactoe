import { Level } from './../DifficultyLevel/DifficultyLevel';
import { CellValue } from './CellType';
import { useState, useEffect, useReducer } from 'react';
import { buildGrid, isEmpty, isFull, processGrid, GameResult } from './Utils';
import AI from '../../Lib/AI';

const SET_GRID = 'game-state.set-grid';
const setGrid = (grid: CellValue[]) => ({
	type: SET_GRID,
	grid,
});

const SET_CELL_VALUE = 'game-state.set-cell-value';
const setCellValue = (index: number, value: CellValue, player: Player) => ({
	type: SET_CELL_VALUE,
	index,
	value,
	player,
});

export enum Player {
	Human = 'human',
	Robot = 'robot',
}

interface GameState {
	grid: CellValue[];
	activePlayer: Player;
}

const gameReducer = (state: GameState, action: any) => {
	switch (action.type) {
		case SET_GRID: {
			return {
				...state,
				grid: action.grid,
				activePlayer: Player.Human,
			};
		}
		case SET_CELL_VALUE: {
			const { index, value, player } = action;
			return {
				...state,
				activePlayer: player === Player.Human ? Player.Robot : Player.Human,
				grid: [
					...state.grid.slice(0, index),
					value,
					...state.grid.slice(index + 1),
				],
			};
		}
		default: {
			return state;
		}
	}
};

const initialState = {
	grid: [],
	activePlayer: Player.Human,
};

interface State {
	grid: CellValue[];
	activePlayer: Player;
	isEmpty: boolean;
	isFull: boolean;
	gameResult: GameResult;
	setCell: (index: number, type: CellValue, player: Player) => void;
	newGame: () => void;
}

const levelToDepth = (level: Level) => {
	switch (level) {
		case Level.Hard:
			return 4;
		case Level.Easy:
		default:
			return 1;
	}
};

const useGameState = (size: number, level: Level): State => {
	// console.log('called useGameState!', size);

	const [state, dispatch] = useReducer(gameReducer, initialState);

	const gameResult = processGrid(state.grid, size);

	const setCell = (index: number, type: CellValue, player: Player) => {
		dispatch(setCellValue(index, type, player));
	};

	const newGame = () => {
		dispatch(setGrid(buildGrid(size)));
	};

	const maxDepth = levelToDepth(level);

	useEffect(() => {
		if (gameResult.isDraw || gameResult.winner) return;

		if (state.activePlayer === Player.Robot) {
			console.log('finding best move', maxDepth);
			const move = AI.findBestMove(state.grid, size, maxDepth);
			dispatch(setCellValue(move.index as number, CellValue.O, Player.Robot));
		}
	}, [state.activePlayer]);

	useEffect(() => {
		newGame();
	}, []);

	useEffect(() => {
		newGame();
	}, [size]);

	return {
		...state,
		isEmpty: isEmpty(state.grid),
		isFull: isFull(state.grid),
		gameResult,
		setCell,
		newGame,
	};
};

export default useGameState;
