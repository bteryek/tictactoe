import React, { useEffect, useState } from 'react';
import './GameBoard.scss';
import _ from 'lodash';
import Cell from '../Cell';
import useGameState, { Player } from './useGameState';
import { CellValue } from './CellType';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { GameState } from '../../Store/GameState/reducer';
import { incrementScore } from '../../Store/GameState/actions';
import Status from '../Status';

interface Props {
	// size: number;
}

const GameBoard: React.FunctionComponent<Props> = ({}) => {
	const { gridSize, level } = useSelector<RootState, GameState>(
		(state) => state.gameState
	);

	const dispatch = useDispatch();

	const { grid, activePlayer, gameResult, setCell, newGame } = useGameState(
		gridSize,
		level
	);

	useEffect(() => {
		if (!gameResult.winner) return;
		dispatch(incrementScore(gameResult.player!));
	}, [gameResult.winner]);

	// console.log('GAME RESULT', gameResult);

	const rows = _.chunk(grid, gridSize);
	// console.log('grid size', grid.length, gridSize, rows);

	const onCellSelected = (index: number) => {
		if (grid[index] !== CellValue.Empty || gameResult.winner) return;
		const value = activePlayer === Player.Human ? CellValue.X : CellValue.O;
		setCell(index, value, activePlayer);
	};

	if (gameResult.winner) {
		console.log(gameResult.sequence, gameResult.orientation);
	}

	return (
		<div className='GameBoard'>
			{gameResult.winner && gameResult.player === Player.Human && (
				<Status>
					<p>You Win!</p>
				</Status>
			)}
			{gameResult.winner && gameResult.player === Player.Robot && (
				<Status>
					<p>You Lose!</p>
				</Status>
			)}
			{gameResult.isDraw && (
				<Status>
					<p>Draw!</p>
				</Status>
			)}
			<div>
				{rows.map((row, i) => {
					return (
						<div key={i} className='row'>
							{row.map((c: CellValue, index: number) => {
								const position = i * gridSize + index;
								return (
									<Cell
										key={position}
										onSelect={onCellSelected}
										value={c}
										index={position}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
			<button onClick={newGame} className='btn'>
				New Game
			</button>
		</div>
	);
};

export default GameBoard;
