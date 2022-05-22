import { memo } from 'react';
import { ExternalLink } from './ExternalLink';

const styleExamples = [
  {
    name: 'CSS/SASS',
    link: 'https://codesandbox.io/s/react-menu-sass-i1wxo'
  },
  {
    name: 'CSS Module',
    link: 'https://codesandbox.io/s/react-menu-css-module-q7zfp'
  },
  {
    name: 'styled-components',
    link: 'https://codesandbox.io/s/react-menu-styled-components-0jrzi'
  },
  {
    name: '@emotion/styled',
    link: 'https://codesandbox.io/s/react-menu-emotion-styled-2l35s'
  },
  {
    name: '@emotion/react',
    link: 'https://codesandbox.io/s/react-menu-emotion-react-ck63i'
  },
  {
    name: '@emotion/css',
    link: 'https://codesandbox.io/s/react-menu-emotion-css-yl4sj'
  },
  {
    name: 'styled-jsx',
    link: 'https://codesandbox.io/s/react-menu-styled-jsx-lcm8z'
  },
  {
    name: 'Tailwind CSS',
    link: 'https://codesandbox.io/s/react-menu-tailwindcss-0r1rvf'
  }
];

export const StyleExamples = memo(function StyleExamples() {
  return (
    <>
      <ul className="style-examples">
        {styleExamples.map(({ name, link }) => (
          <li key={name}>
            <ExternalLink href={link}>{name}</ExternalLink>
          </li>
        ))}
      </ul>
      <p>
        <i>All styles are locally scoped to the components except in the CSS/SASS example.</i>
      </p>
    </>
  );
});
