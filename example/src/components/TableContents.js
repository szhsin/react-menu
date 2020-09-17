import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export const TableContents = React.memo(function TableContents({
    list
}) {

    const listElt = list.map((item) => {
        let nested = null;
        if (item.list) {
            nested = <TableContents list={item.list} />;
        }

        return (
            <li key={item.id}>
                <Link to={`#${item.id}`}>{item.title}</Link>
                {nested}
            </li>
        );
    });

    return (
        <ul className='table-contents'>
            {listElt}
        </ul>
    );
});
