import React, { useContext } from 'react';
import { DomInfoContext } from '../utils';
import { TableContentsList } from './TableContentsList';

export const TableContents = React.memo(function TableContents({
    children
}) {

    const domInfo = useContext(DomInfoContext);

    return (
        <aside className="table-contents"
            style={{ top: domInfo.navbarHeight + 'px' }}>
            <nav aria-label="Table of contents"
                style={{
                    maxHeight: domInfo.tocPosition === 'sticky'
                        ? domInfo.vHeight - domInfo.navbarHeight + 'px'
                        : undefined
                }}>
                <TableContentsList list={children} />
            </nav>
        </aside>
    );
});
