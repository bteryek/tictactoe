import React from 'react';
import './Cell.scss';
import { CellValue } from '../GameBoard/CellType';
import classNames from 'classnames';

interface Props {
	value: CellValue;
	index: number;
	highlight?: boolean;
	onSelect: (index: number) => void;
}

const Cell: React.FunctionComponent<Props> = ({
	value,
	index,
	highlight,
	onSelect,
}) => {
	const cellClasses = classNames({
		Cell: true,
		highlight: highlight,
	});

	return (
		<div onClick={() => onSelect(index)} className={cellClasses}>
			<p>{value}</p>
			{/* <span>{index}</span> */}
		</div>
	);
};

export default Cell;
