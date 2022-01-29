import React from 'react';

const NotFound = React.memo(function NotFound() {
  return (
    <>
      {/* place holder for maintaining page structure */}
      <div className="table-contents" role="presentation" />

      <main id="not-found">
        <h1>404 - Page Not Found</h1>
      </main>

      <div className="place-holder" role="presentation" />
    </>
  );
});

export default NotFound;
