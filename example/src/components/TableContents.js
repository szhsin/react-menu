import React from 'react';
import { TableContentsList } from './TableContentsList';

export const TableContents = React.memo(function TableContents({
    children
}) {

    return (
        <aside className="table-contents">
            <nav aria-label="Table of contents">
                <TableContentsList list={children} />
            </nav>
        </aside>
    );
});
