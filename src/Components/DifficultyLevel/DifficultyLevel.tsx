import React from 'react';
import './DifficultyLevel.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { setLevel } from '../../Store/GameState/actions';
import classNames from 'classnames';

export enum Level {
	Easy = 'easy',
	Hard = 'hard',
}

const DifficultyLevel: React.FC = () => {
	const dispatch = useDispatch();
	const level = useSelector<RootState>((state) => state.gameState.level);

	const onChangeLevel = (lvl: Level) => {
		if (lvl === level) return;
		dispatch(setLevel(lvl));
	};

	const easyClasses = classNames({
		btn: true,
		active: level === Level.Easy,
	});

	const hardClasses = classNames({
		btn: true,
		active: level === Level.Hard,
	});

	return (
		<div>
			{/* <h2>Difficulty Level:</h2> */}
			<div className='DifficultyLevel'>
				<button
					onClick={() => onChangeLevel(Level.Easy)}
					className={easyClasses}
				>
					Easy
				</button>
				<button
					onClick={() => onChangeLevel(Level.Hard)}
					className={hardClasses}
				>
					Hard
				</button>
			</div>
		</div>
	);
};

export default DifficultyLevel;
