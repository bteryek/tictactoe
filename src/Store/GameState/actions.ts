import { Level } from '../../Components/DifficultyLevel/DifficultyLevel';
import { Player } from '../../Components/GameBoard/useGameState';

export const SET_LEVEL = 'game-state.set-level';
export const SET_GRID_SIZE = 'game-state.set-grid-size';
export const INCREMENT_SCORE = 'game-state.increment-score';

export interface SetLevelAction {
	type: typeof SET_LEVEL;
	level: Level;
}

export interface SetGridSizeAction {
	type: typeof SET_GRID_SIZE;
	gridSize: number;
}

export interface IncrementScore {
	type: typeof INCREMENT_SCORE;
	player: Player;
}

export type GameStateActionTypes =
	| SetLevelAction
	| SetGridSizeAction
	| IncrementScore;

export const setLevel = (level: Level): GameStateActionTypes => ({
	type: SET_LEVEL,
	level,
});

export const setGridSize = (gridSize: number): GameStateActionTypes => ({
	type: SET_GRID_SIZE,
	gridSize,
});

export const incrementScore = (player: Player) => ({
	type: INCREMENT_SCORE,
	player,
});
