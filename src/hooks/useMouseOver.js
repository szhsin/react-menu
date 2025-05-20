import { useState, useEffect } from 'react';

const useMouseOver = (isHovering) => {
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    !isHovering && setMouseOver(false);
  }, [isHovering]);

  return [mouseOver, () => !mouseOver && setMouseOver(true), () => setMouseOver(false)];
};

export { useMouseOver };
