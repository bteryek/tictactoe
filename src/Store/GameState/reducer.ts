import { Level } from './../../Components/DifficultyLevel/DifficultyLevel';
import { Player } from '../../Components/GameBoard/useGameState';

import {
	GameStateActionTypes,
	SET_LEVEL,
	SET_GRID_SIZE,
	INCREMENT_SCORE,
} from './actions';

export interface GameState {
	gridSize: number;
	level: Level;
	humanScore: number;
	aiScore: number;
}

const initialState: GameState = {
	gridSize: 3,
	level: Level.Easy,
	humanScore: 0,
	aiScore: 0,
};

const reducer = (
	state: GameState = initialState,
	action: GameStateActionTypes
): GameState => {
	switch (action.type) {
		case SET_LEVEL: {
			const { level } = action;
			return {
				...state,
				level,
			};
		}

		case SET_GRID_SIZE: {
			const { gridSize } = action;
			return {
				...state,
				gridSize,
			};
		}

		case INCREMENT_SCORE: {
			const { player } = action;
			if (player === Player.Human) {
				return {
					...state,
					humanScore: state.humanScore + 1,
				};
			} else {
				return {
					...state,
					aiScore: state.aiScore + 1,
				};
			}
		}

		default: {
			return state;
		}
	}
};

export default reducer;
