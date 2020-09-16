import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';

export const Example = React.memo(function Example({
    data,
    children
}) {
    const snippetRef = useRef(null);
    const { title, desc, snippet, fullSnippet } = data;
    const [showFullSnippet, setShowFullSnippet] = useState(false);

    useEffect(() => {
        snippetRef.current.querySelectorAll('pre code').forEach(hljs.highlightBlock);
    }, [showFullSnippet]);

    return (
        <section className="example">
            <h2>{title}</h2>
            <p>{desc}</p>
            <div className="code-demo">
                {children}
            </div>

            <div className="actions">
                <button className={`btn ${showFullSnippet ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => setShowFullSnippet(s => !s)}>
                    <i className="material-icons" title="code">code</i>
                </button>
                <button className="btn btn-outline-secondary">
                    <i className="material-icons">create</i>
                </button>
            </div>

            <pre className="code-snippet" ref={snippetRef}>
                <code className="lang-jsx">
                    {showFullSnippet ? fullSnippet : snippet}
                </code>
            </pre>
        </section>
    );
});
