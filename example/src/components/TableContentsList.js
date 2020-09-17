import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export const TableContentsList = React.memo(function TableContentsList({
    list
}) {

    const listElt = list.map((item) => {
        let nested = null;
        if (item.list) {
            nested = <TableContentsList list={item.list} />;
        }

        return (
            <li key={item.id}>
                <Link smooth to={`#${item.id}`}>{item.title}</Link>
                {nested}
            </li>
        );
    });

    return (
        <ul className='contents-list'>
            {listElt}
        </ul>
    );
});

