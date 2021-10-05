import React from 'react';
import { TableContents } from './TableContents';
import { CascadingContents } from './CascadingContents';

export const PageView = React.memo(function PageView({ id, data }) {
  return (
    <React.Fragment>
      <TableContents>{data}</TableContents>

      <main id={id}>
        {data.map((c) => (
          <CascadingContents key={c.id} {...c} sectioning={false} />
        ))}
      </main>

      <div className="place-holder" role="presentation" />
    </React.Fragment>
  );
});
