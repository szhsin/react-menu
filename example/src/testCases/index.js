import React from 'react';
import Reposition from './Reposition';
import Overflow from './Overflow';
import Portal from './Portal';
import RenderProps from './RenderProps';
import './index.scss';

const TestCases = () => {
    return (
        <>
            <Reposition />
            <Overflow />
            <Portal />
            <RenderProps />
        </>
    );
}

export default TestCases;
