import React, { useEffect } from 'react';
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

const GameBoard: React.FunctionComponent = () => {
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

	const rows = _.chunk(grid, gridSize);

	const onCellSelected = (index: number) => {
		if (grid[index] !== CellValue.Empty || gameResult.winner) return;
		const value = activePlayer === Player.Human ? CellValue.X : CellValue.O;
		setCell(index, value, activePlayer);
	};

	const winningSequence = gameResult.sequence || [];

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
								const highlight = winningSequence.indexOf(position) !== -1;
								return (
									<Cell
										key={position}
										onSelect={onCellSelected}
										highlight={highlight}
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
