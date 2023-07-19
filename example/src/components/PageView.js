import React from 'react';
import { TableContents } from './TableContents';
import { CascadingContents } from './CascadingContents';
import { RightSection } from './RightSection';

export const PageView = React.memo(function PageView({ id, data, showRightSection }) {
  return (
    <>
      <TableContents>{data}</TableContents>

      <div className="main-wrap">
        <main id={id}>
          {data.map((c) => (
            <CascadingContents key={c.id} {...c} sectioning={false} />
          ))}
        </main>
      </div>

      {showRightSection && <RightSection />}
    </>
  );
});
