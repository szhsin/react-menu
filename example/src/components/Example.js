import React, { useState, useEffect, useRef } from 'react';
import { bem } from '../utils';
import { HashLink as Link } from 'react-router-hash-link';
import hljs from 'highlight.js';
import $ from 'jquery';

export const Example = React.memo(function Example({
    initialFullSource,
    data,
    children,
    ...restProps
}) {
    const ref = useRef(null);
    const { id, title, desc, source, fullSource } = data;
    const [isFullSource, setIsFullSource] = useState(initialFullSource);

    useEffect(() => {
        $(ref.current).find('pre code').each((index, block) => hljs.highlightBlock(block));
        $(ref.current).find('[data-toggle="tooltip"]').tooltip('hide').tooltip();
    }, [isFullSource]);

    return (
        <section className={bem('example')} ref={ref} aria-labelledby={id}>
            <Link className="hash-link" smooth to={`#${id}`}  >
                <h2 id={id} className="heading">{title}</h2>
            </Link>

            <p>{desc}</p>
            <div {...restProps} className={bem('example', 'demo')}>
                {children}
            </div>

            <div className={bem('example', 'actions')}>
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

            <pre className={bem('example', 'source')} >
                <code className="lang-jsx">
                    {isFullSource ? fullSource : source}
                </code>
            </pre>
        </section>
    );
});
