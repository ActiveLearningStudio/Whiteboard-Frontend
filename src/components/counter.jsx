import React from 'react';
import CountUp from 'react-countup';

const Counter = ({ end = 0 }) => {
	return <CountUp end={end} />;
};

export default Counter;
