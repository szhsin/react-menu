import React, { useState, useRef, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';


export const HashHeading = React.memo(function HashHeading({
    id,
    title,
    heading,
    smooth
}) {

    const ref = useRef(null);
    const [hover, setHover] = useState(false);
    const [fontSize, setFontSize] = useState();

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }

    useEffect(() => {
        setFontSize(getComputedStyle(ref.current).getPropertyValue('font-size'));
    }, []);

    return (
        <>
            {React.createElement(
                heading,
                {
                    id,
                    ref,
                    className: 'hash-heading',
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave
                },
                title)}

            <Link className="hash-link"                
                to={`#${id}`}
                smooth={smooth}
                style={{ fontSize, opacity: hover ? 1 : 0 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>#</Link>
        </>
    );
});

HashHeading.defaultProps = {
    heading: 'h1'
};
