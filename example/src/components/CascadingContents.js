import React from 'react';
import { HashHeading } from './HashHeading';
import { Table } from './Table';

export const CascadingContents = React.memo(function CascadingContents({
  id,
  title,
  contents,
  list,
  level = 1,
  sectioning = true
}) {
  return React.createElement(
    sectioning ? 'section' : React.Fragment,
    sectioning ? { 'aria-labelledby': id } : undefined,
    <HashHeading id={id} title={title} heading={'h' + level} />,
    contents &&
      contents.map((c, i) =>
        c.contentType === 'table' ? (
          <Table key={i} {...c} />
        ) : (
          <React.Fragment key={i}>{c}</React.Fragment>
        )
      ),
    list && list.map((c) => <CascadingContents key={c.id} {...c} level={level + 1} />)
  );
});
