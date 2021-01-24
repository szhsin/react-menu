import React, { useContext, useEffect, useRef } from 'react';
import { bem, DomInfoContext, SettingContext, TocContext } from '../utils';
import { TableContentsList } from './TableContentsList';
import { Logo } from './Logo';
import { ThemeSwitch } from './ThemeSwitch';

const blockName = 'table-contents';

export const TableContents = React.memo(function TableContents({
    children
}) {

    const ref = useRef(null);
    const domInfo = useContext(DomInfoContext);
    const { theme } = useContext(SettingContext);
    const { isTocOpen, setTocOpen } = useContext(TocContext);

    let top, maxHeight = undefined;
    if (domInfo.tocPosition === 'sticky') {
        top = `${domInfo.navbarHeight}px`;
        maxHeight = `${domInfo.vHeight - domInfo.navbarHeight}px`;
    }

    useEffect(() => {
        if (isTocOpen) ref.current.focus();
    }, [isTocOpen]);

    const handleClose = e => {
        if (e.currentTarget === e.target) setTocOpen(false);
    }

    return (
        <aside className={bem(blockName, null, { open: isTocOpen, theme })}
            style={{ top }}
            onTouchStart={handleClose}
            onClick={handleClose}
            onKeyDown={e => e.key === 'Escape' && setTocOpen(false)}>
            <nav aria-label="Table of contents"
                tabIndex="-1" ref={ref}
                style={{ maxHeight }}>
                <div className={bem(blockName, 'header')}>
                    <Logo />
                    <ThemeSwitch />
                </div>
                <TableContentsList list={children} />
            </nav>
        </aside>
    );
});
