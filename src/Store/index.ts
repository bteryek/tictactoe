import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import gameStateReducer, { GameState } from './GameState/reducer';

const rootReducers = combineReducers({
	gameState: gameStateReducer,
});

export interface RootState {
	gameState: GameState;
}

const store = createStore(rootReducers);
export default store;
