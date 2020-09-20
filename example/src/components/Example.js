import React, { useState, useEffect, useRef, useContext } from 'react';
import { bem, ToastContext } from '../utils';
import { HashLink as Link } from 'react-router-hash-link';
import hljs from 'highlight.js';
import $ from 'jquery';

export const Example = React.memo(function Example({
    initialFullSource,
    data,
    children,
    ...restProps
}) {
    const { id, title, desc, source, fullSource } = data;
    const ref = useRef(null);
    const setToast = useContext(ToastContext);
    const [isFullSource, setIsFullSource] = useState(initialFullSource);
    const sourceCode = isFullSource ? fullSource : source;

    const handleCopy = () => {
        navigator.clipboard.writeText(sourceCode)
            .then(() => setToast('The code has been copied.'))
            .catch(() => setToast('Something went wrong.'));
    }

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
                {sourceCode && <button className="btn btn-outline-secondary"
                    data-toggle="tooltip" data-placement="top"
                    data-original-title="Copy code"
                    onClick={handleCopy}>
                    <i className="material-icons">content_copy</i>
                </button>}
                <button className={`btn ${isFullSource ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    data-toggle="tooltip" data-placement="top"
                    data-original-title={`${isFullSource ? 'Hide' : 'Show'} full source code`}
                    onClick={() => setIsFullSource(s => !s)}>
                    <i className="material-icons">code</i>
                </button>
            </div>

            {sourceCode && <pre className={bem('example', 'source')} >
                <code className="lang-jsx">
                    {sourceCode}
                </code>
            </pre>}
        </section>
    );
});
