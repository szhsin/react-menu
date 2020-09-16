import React from 'react';

export const Example = React.memo(function Example({
    codeSnippet,
    children
 }) {

    return (
        <section className="example">
        <h2>Basic menu</h2>
        <p>The Basic menu</p>
        <div className="code-demo">
            {children}
        </div>

        <pre className="code-snippet">
            <code className="lang-jsx">
                {codeSnippet}
            </code>
        </pre>
    </section>
    );
});
