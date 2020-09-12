import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { Player } from '../GameBoard/useGameState';
import './Avatar.scss';

interface Props {
	imgUrl: string;
	name: string;
	player: Player;
}

const Avatar: React.FC<Props> = ({ name, imgUrl, player }) => {
	const score = useSelector<RootState, number>((state) =>
		player === Player.Human
			? state.gameState.humanScore
			: state.gameState.aiScore
	);

	return (
		<div className='Avatar'>
			<img src={imgUrl} />
			<p>
				<span data-testid='name' className='name'>
					{name}
				</span>
				:{' '}
				<span data-testid='score' className='score'>
					{score}
				</span>
			</p>
		</div>
	);
};

export default Avatar;
