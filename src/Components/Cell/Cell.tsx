import React from 'react';
import './Cell.scss';
import { CellValue } from '../GameBoard/CellType';

interface Props {
	value: CellValue;
	index: number;
	onSelect: (index: number) => void;
}

const Cell: React.FunctionComponent<Props> = ({ value, index, onSelect }) => {
	return (
		<div onClick={() => onSelect(index)} className='Cell'>
			<p>{value}</p>
			{/* <span>{index}</span> */}
		</div>
	);
};

export default Cell;
