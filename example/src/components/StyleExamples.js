import React from 'react';
import { ExternalLink } from './ExternalLink';

export const StyleExamples = React.memo(function StyleExamples() {
  return (
    <>
      <ul className="style-examples">
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-sass-i1wxo">
            Vanilla CSS/SASS
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-css-module-q7zfp">
            CSS Module
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-styled-components-0jrzi">
            styled-components
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-emotion-styled-2l35s">
            @emotion/styled
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-emotion-react-ck63i">
            @emotion/react
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-emotion-css-yl4sj">
            @emotion/css
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://codesandbox.io/s/react-menu-styled-jsx-lcm8z">
            styled-jsx
          </ExternalLink>
        </li>
      </ul>
      <p>
        <i>
          All styles are locally scoped to the components except in the Vanilla CSS/SASS example.
        </i>
      </p>
    </>
  );
});
