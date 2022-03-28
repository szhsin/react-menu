import React, { useState, useEffect, useRef, useContext } from 'react';
import { ControlledMenu, useMenuState } from '@szhsin/react-menu';
import { bem, DomInfoContext, SettingContext } from '../utils';
import hljs from '../utils/highlight';
import { CodeSandboxIcon } from './Icons';
import { HashHeading } from './HashHeading';

const blockName = 'example';

export const Example = React.memo(
  React.forwardRef(function Example(
    {
      initialFullSource,
      data: { id, title, desc, note, source, fullSource, codeSandbox },
      children,
      ...restProps
    },
    ref
  ) {
    const refSection = useRef(null);
    const [isFullSource, setIsFullSource] = useState(initialFullSource);
    const sourceCode = isFullSource ? fullSource : source;
    const sourceBtnTitle = `${isFullSource ? 'Hide' : 'Show'} full source code`;
    const [{ state }, toggleMenu] = useMenuState({ unmountOnClose: true });
    const refCopy = useRef(null);
    const refSource = useRef(null);
    const refSandbox = useRef(null);
    const [anchorRef, setAnchorRef] = useState();
    const [toolTip, setToolTip] = useState();
    const { navbarHeight } = useContext(DomInfoContext);

    const handleCopy = () => {
      navigator.clipboard
        .writeText(sourceCode)
        .then(() => setToolTip('Copied!'))
        .catch(() => setToolTip('Something went wrong.'));
    };

    const getBtnMouseEvents = (anchorRef, tooltip) => ({
      onMouseEnter() {
        setAnchorRef(anchorRef);
        setToolTip(tooltip);
        toggleMenu(true);
      },
      onMouseLeave() {
        toggleMenu(false);
      }
    });

    useEffect(() => {
      setToolTip(sourceBtnTitle);
      refSection.current.querySelectorAll('pre code').forEach((elt) => hljs.highlightElement(elt));
    }, [sourceBtnTitle]);

    return (
      <section className={bem(blockName)} ref={refSection} aria-labelledby={id}>
        <HashHeading id={id} title={title} heading="h3" />

        {desc}
        <div {...restProps} ref={ref} className={bem(blockName, 'demo')}>
          {children}
        </div>

        <div className={bem(blockName, 'actions')}>
          {sourceCode && (
            <button
              ref={refCopy}
              className={bem(blockName, 'action-btn') + ' btn'}
              aria-label="Copy code"
              onClick={handleCopy}
              {...getBtnMouseEvents(refCopy, 'Copy code')}
            >
              <i className="material-icons">content_copy</i>
            </button>
          )}
          {fullSource && (
            <button
              ref={refSource}
              className={bem(blockName, 'action-btn', { on: isFullSource }) + ' btn'}
              aria-label={sourceBtnTitle}
              onClick={() => setIsFullSource((s) => !s)}
              {...getBtnMouseEvents(refSource, sourceBtnTitle)}
            >
              <i className="material-icons">code</i>
            </button>
          )}

          {codeSandbox && (
            <a
              ref={refSandbox}
              href={codeSandbox}
              target="_blank"
              rel="noopener noreferrer"
              className={bem(blockName, 'action-btn', { link: true }) + ' btn'}
              {...getBtnMouseEvents(refSandbox, 'Edit on CodeSandbox')}
            >
              <CodeSandboxIcon />
            </a>
          )}

          <ControlledMenu
            theming={useContext(SettingContext).theme}
            anchorRef={anchorRef}
            state={state}
            captureFocus={false}
            role="tooltip"
            arrow
            direction="top"
            align="center"
            boundingBoxPadding={`${navbarHeight} 0 0 0`}
          >
            {toolTip}
          </ControlledMenu>
        </div>

        {sourceCode && (
          <pre className={bem(blockName, 'source')}>
            <code className="lang-jsx">{sourceCode}</code>
          </pre>
        )}
        {note}
      </section>
    );
  })
);
