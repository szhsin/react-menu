import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';

export const TableContentsList = React.memo(function TableContentsList({ list, level, maxHeight }) {
  const listElt = list.map((item) => {
    let nested = null;
    if (item.list) {
      nested = <TableContentsList list={item.list} level={level + 1} />;
    }

    return (
      <li key={item.id}>
        <Link to={`#${item.id}`}>{item.title}</Link>
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

TableContentsList.defaultProps = {
  level: 1
};
