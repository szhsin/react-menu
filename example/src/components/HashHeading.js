import { createElement, memo, useState, useRef } from 'react';
import Link from 'next/link';
import { bem, useLayoutEffect } from '../utils';

const blockName = 'hash-heading';

export const HashHeading = memo(function HashHeading({ id, title, heading = 'h1' }) {
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
      {createElement(
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
