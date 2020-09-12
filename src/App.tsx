import React from 'react';
import { Provider } from 'react-redux';
import GameBoard from './Components/GameBoard';
import Avatar from './Components/Avatar';
import DifficultyLevel from './Components/DifficultyLevel';
import BoardSize from './Components/BoardSize';
import store from './Store';

import './App.scss';
import { Player } from './Components/GameBoard/useGameState';

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<div className='wrap'>
					<h1 className='title'>Tic Tac Toe!</h1>
					<div className='users'>
						<Avatar
							player={Player.Human}
							name='Human'
							imgUrl='https://p.kindpng.com/picc/s/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png'
						/>
						<Avatar
							player={Player.Robot}
							name='AI'
							imgUrl='https://www.halopedia.org/images/thumb/8/86/Queen_Cortana.png/292px-Queen_Cortana.png'
						/>
					</div>
					<DifficultyLevel />
					<BoardSize />
					<GameBoard />
				</div>
			</div>
		</Provider>
	);
}

export default App;
