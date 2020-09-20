import React, { useContext } from 'react';
import { DomSizeContext } from '../utils';
import { TableContentsList } from './TableContentsList';

export const TableContents = React.memo(function TableContents({
    children
}) {

    const domSize = useContext(DomSizeContext);

    return (
        <aside className="table-contents"
            style={{ top: domSize.navbarHeight + 'px' }}>
            <nav aria-label="Table of contents"
                style={{ maxHeight: domSize.tocHeight ? domSize.tocHeight + 'px' : undefined }}>
                <TableContentsList list={children} />
            </nav>
        </aside>
    );
});
