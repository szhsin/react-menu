import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export const TableContentsList = React.memo(function TableContentsList({
  list,
  level = 1,
  maxHeight
}) {
  const listElt = list.map((item) => {
    let nested = null;
    if (item.list) {
      nested = <TableContentsList list={item.list} level={level + 1} />;
    }

    return (
      <li key={item.id}>
        <Link href={`#${item.id}`}>{item.title}</Link>
        {nested}
      </li>
    );
  });

  return (
    <ul className={`contents-list-lv${level}`} style={{ maxHeight }}>
      {listElt}
    </ul>
  );
});

TableContentsList.propTypes = {
  list: PropTypes.array.isRequired,
  level: PropTypes.number
};
