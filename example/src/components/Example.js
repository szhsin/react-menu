import React, { useState, useEffect, useRef, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { bem, ToastContext } from '../utils';
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
    const sourceBtnTitle = `${isFullSource ? 'Hide' : 'Show'} full source code`;

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
            <Link className="hash-link" smooth to={`#${id}`}>
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
                    aria-label="Copy code"
                    onClick={handleCopy}>
                    <i className="material-icons">content_copy</i>
                </button>}
                <button className={`btn ${isFullSource ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    data-toggle="tooltip" data-placement="top"
                    data-original-title={sourceBtnTitle}
                    aria-label={sourceBtnTitle}
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
