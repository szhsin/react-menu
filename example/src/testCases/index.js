import React from 'react';
import Reposition from './Reposition';
import Overflow from './Overflow';
import Portal from './Portal';
import RenderProps from './RenderProps';
import DynamicChildren from './DynamicChildren';
import SubmenuDirection from './SubmenuDirection';

const TestCases = () => {
  return (
    <>
      <Reposition />
      <Overflow />
      <Portal />
      <RenderProps />
      <DynamicChildren />
      <SubmenuDirection />
    </>
  );
};

export default TestCases;
