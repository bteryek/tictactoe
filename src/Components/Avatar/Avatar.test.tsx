import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import './Avatar';
import { Player } from '../GameBoard/useGameState';
import Avatar from './Avatar';
import { useSelector } from 'react-redux';

const mockUseSelector = jest.fn();

jest.mock('react-redux', () => ({
	useSelector: (selector: any) => mockUseSelector(selector),
}));

describe('Avatar', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('It renders', () => {
		const props = {
			imgUrl: 'http://image.com/test.png',
			name: 'Joe',
			player: Player.Human,
		};

		const { container } = render(<Avatar {...props} />);
		expect(container).toBeTruthy();
	});

	test('Uses correct state from store for given player type', () => {
		const props = {
			imgUrl: 'http://image.com/test.png',
			name: 'Joe',
			player: Player.Human,
		};

		const mockState = {
			gameState: {
				humanScore: 10,
				aiScore: 0,
			},
		};

		mockUseSelector.mockImplementation((selector: any) => selector(mockState));

		const { getByTestId } = render(<Avatar {...props} />);
		expect(getByTestId('score').textContent).toBe('10');
		expect(getByTestId('name').textContent).toBe('Joe');
	});
});
