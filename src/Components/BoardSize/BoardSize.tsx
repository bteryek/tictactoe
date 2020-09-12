import React from 'react';
import sizes from './sizes';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import './BoardSize.scss';
import { RootState } from '../../Store';
import { setGridSize } from '../../Store/GameState/actions';

const BoardSize: React.FC = () => {
	const dispatch = useDispatch();
	const gridSize = useSelector<RootState>((state) => state.gameState.gridSize);

	const onChangeSize = (size: number) => {
		if (size === gridSize) return;
		dispatch(setGridSize(size));
	};

	return (
		<div className='BoardSize'>
			{sizes.map((size) => {
				const classes = classNames({
					btn: true,
					active: size === gridSize,
				});

				return (
					<button
						key={size}
						onClick={() => onChangeSize(size)}
						className={classes}
					>
						{size}
					</button>
				);
			})}
		</div>
	);
};

export default BoardSize;
