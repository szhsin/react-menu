import React, { useState, useRef, useLayoutEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { bem } from '../utils';

const blockName = 'hash-heading';

export const HashHeading = React.memo(function HashHeading({
    id,
    title,
    heading,
    smooth
}) {

    const ref = useRef(null);
    const [hover, setHover] = useState(false);
    const [fontSize, setFontSize] = useState();

    useLayoutEffect(() => {
        setFontSize(getComputedStyle(ref.current).getPropertyValue('font-size'));
    }, []);

    return (
        <div className={bem(blockName)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {React.createElement(
                heading,
                {
                    id,
                    ref,
                    className: bem(blockName, 'heading')
                },
                title)}

            <Link className={bem(blockName, 'link', { hover })}
                to={`#${id}`}
                smooth={smooth}
                style={{ fontSize }}>
                #
            </Link>
        </div>
    );
});

HashHeading.defaultProps = {
    heading: 'h1'
};
