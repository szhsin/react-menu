import React, { useState, useEffect, useRef } from 'react';
import { HashHeading } from './HashHeading';
import { bem } from '../utils';
import {
    ControlledMenu,
    MenuHeader
} from '@szhsin/react-menu';
import hljs from 'highlight.js';

const blockName = 'example';

export const Example = React.memo(function Example({
    initialFullSource,
    data: { id, title, desc, source, fullSource },
    children,
    ...restProps
}) {
    const ref = useRef(null);
    const [isFullSource, setIsFullSource] = useState(initialFullSource);
    const sourceCode = isFullSource ? fullSource : source;
    const sourceBtnTitle = `${isFullSource ? 'Hide' : 'Show'} full source code`;
    const [isOpen, setOpen] = useState(false);
    const refCopy = useRef(null);
    const refSource = useRef(null);
    const [anchorRef, setAnchorRef] = useState();
    const [toolTip, setToolTip] = useState();

    const handleCopy = () => {
        navigator.clipboard.writeText(sourceCode)
            .then(() => setToolTip('Copied!'))
            .catch(() => setToolTip('Something went wrong.'));
    }

    useEffect(() => {
        setToolTip(sourceBtnTitle);
        ref.current.querySelectorAll('pre code')
            .forEach(block => hljs.highlightBlock(block));
    }, [sourceBtnTitle]);

    return (
        <section className={bem(blockName)} ref={ref} aria-labelledby={id}>
            <HashHeading id={id} title={title} heading="h3" />

            {desc}
            <div {...restProps} className={bem(blockName, 'demo')}>
                {children}
            </div>

            <div className={bem(blockName, 'actions')}>
                {sourceCode &&
                    <button ref={refCopy}
                        className={bem(blockName, 'action-btn') + ' btn'}
                        aria-label="Copy code"
                        onClick={handleCopy}
                        onMouseEnter={() => {
                            setAnchorRef(refCopy);
                            setToolTip('Copy code')
                            setOpen(true);
                        }}
                        onMouseLeave={() => setOpen(false)}>
                        <i className="material-icons">content_copy</i>
                    </button>}
                {fullSource &&
                    <button ref={refSource}
                        className={bem(blockName, 'action-btn', { on: isFullSource }) + ' btn'}
                        aria-label={sourceBtnTitle}
                        onClick={() => setIsFullSource(s => !s)}
                        onMouseEnter={() => {
                            setAnchorRef(refSource);
                            setToolTip(sourceBtnTitle)
                            setOpen(true);
                        }}
                        onMouseLeave={() => setOpen(false)}>
                        <i className="material-icons">code</i>
                    </button>}

                <ControlledMenu
                    anchorRef={anchorRef} isOpen={isOpen} isMounted={isOpen}
                    captureFocus={false} animation={false}
                    arrow direction="top" align="center">
                    <MenuHeader>{toolTip}</MenuHeader>
                </ControlledMenu>
            </div>

            {sourceCode &&
                <pre className={bem(blockName, 'source')} >
                    <code className="lang-jsx">
                        {sourceCode}
                    </code>
                </pre>}
        </section>
    );
});
