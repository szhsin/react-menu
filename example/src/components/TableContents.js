import React, { useContext, useEffect, useRef } from 'react';
import { bem, DomInfoContext, TocContext } from '../utils';
import { TableContentsList } from './TableContentsList';

export const TableContents = React.memo(function TableContents({
    children
}) {

    const ref = useRef(null);
    const domInfo = useContext(DomInfoContext);
    const { isTocOpen, setTocOpen } = useContext(TocContext);

    let top, maxHeight = undefined;
    if (domInfo.tocPosition === 'sticky') {
        top = `${domInfo.navbarHeight}px`;
        maxHeight = `${domInfo.vHeight - domInfo.navbarHeight}px`;
    }

    useEffect(() => {
        if (isTocOpen) ref.current.focus();
    }, [isTocOpen]);

    return (
        <aside className={bem('table-contents', null, { open: isTocOpen })}
            style={{ top }}
            onClick={e => e.currentTarget === e.target && setTocOpen(false)}
            onKeyDown={e => e.key === 'Escape' && setTocOpen(false)}>
            <nav aria-label="Table of contents"
                tabIndex="-1" ref={ref}
                style={{ maxHeight }}>
                <TableContentsList list={children} />
            </nav>
        </aside>
    );
});
