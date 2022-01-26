import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { bem, useLayoutEffect } from '../utils';

const blockName = 'hash-heading';

export const HashHeading = React.memo(function HashHeading({ id, title, heading }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [fontSize, setFontSize] = useState();

  useLayoutEffect(() => {
    setFontSize(getComputedStyle(ref.current).getPropertyValue('font-size'));
  }, []);

  return (
    <div
      className={bem(blockName)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {React.createElement(
        heading,
        {
          id,
          ref,
          className: bem(blockName, 'heading')
        },
        title
      )}

      <Link href={`#${id}`}>
        <a className={bem(blockName, 'link', { hover })} style={{ fontSize }}>
          #
        </a>
      </Link>
    </div>
  );
});

HashHeading.defaultProps = {
  heading: 'h1'
};
