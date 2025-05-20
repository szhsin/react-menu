'use strict';

var react = require('react');

const useMouseOver = isHovering => {
  const [mouseOver, setMouseOver] = react.useState(false);
  react.useEffect(() => {
    !isHovering && setMouseOver(false);
  }, [isHovering]);
  return [mouseOver, () => !mouseOver && setMouseOver(true), () => setMouseOver(false)];
};

exports.useMouseOver = useMouseOver;
