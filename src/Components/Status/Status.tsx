import React, { ReactElement } from 'react';
import './Status.scss';

interface Props {
	children: ReactElement;
}

const Status: React.FC<Props> = ({ children }) => {
	return <div className='Status'>{children}</div>;
};

export default Status;
