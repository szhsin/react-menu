import React from 'react';

export const NotFound = React.memo(function NotFound() {

    return (
        <>
            {/* place holder for maintaining page structure */}
            <div className="table-contents" role="presentation" />

            <main id="not-found">
                <h1>Page not found</h1>
            </main>

            <div className="place-holder" role="presentation" />
        </>
    );
});
