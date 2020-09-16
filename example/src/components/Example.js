import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import $ from 'jquery';

export const Example = React.memo(function Example({
    initialFullSource,
    data,
    children
}) {
    const ref = useRef(null);
    const { title, desc, source, fullSource } = data;
    const [isFullSource, setIsFullSource] = useState(initialFullSource);

    useEffect(() => {
        $(ref.current).find('pre code').each((index, block) => hljs.highlightBlock(block));
        $(ref.current).find('[data-toggle="tooltip"]').tooltip().tooltip('hide');
    }, [isFullSource]);

    return (
        <section className="example" ref={ref}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <div className="code-demo">
                {children}
            </div>

            <div className="actions">
                <button className={`btn ${isFullSource ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    data-toggle="tooltip" data-placement="top"
                    data-original-title={`${isFullSource ? 'Hide' : 'Show'} full source code`}
                    onClick={() => setIsFullSource(s => !s)}>
                    <i className="material-icons">code</i>
                </button>
                <button className="btn btn-outline-secondary"
                    data-toggle="tooltip" data-placement="top"
                    data-original-title="Edit in CodeSandbox">
                    <i className="material-icons">create</i>
                </button>
            </div>

            <pre className="code-source" >
                <code className="lang-jsx">
                    {isFullSource ? fullSource : source}
                </code>
            </pre>
        </section>
    );
});
