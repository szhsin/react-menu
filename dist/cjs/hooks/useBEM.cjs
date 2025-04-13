'use strict';

var react = require('react');

const useBEM = ({
  block,
  element,
  modifiers,
  className
}) => react.useMemo(() => {
  const blockElement = element ? `${block}__${element}` : block;
  let classString = blockElement;
  modifiers && Object.keys(modifiers).forEach(name => {
    const value = modifiers[name];
    if (value) classString += ` ${blockElement}--${value === true ? name : `${name}-${value}`}`;
  });
  let expandedClassName = typeof className === 'function' ? className(modifiers) : className;
  if (typeof expandedClassName === 'string') {
    expandedClassName = expandedClassName.trim();
    if (expandedClassName) classString += ` ${expandedClassName}`;
  }
  return classString;
}, [block, element, modifiers, className]);

exports.useBEM = useBEM;
