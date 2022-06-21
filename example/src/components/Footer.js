import React, { useState, useContext, useEffect } from 'react';
import { basePath } from '../../next.config';
import { version, build, SettingContext } from '../utils';

export const Footer = React.memo(function Footer() {
  const { isDark } = useContext(SettingContext);
  const [starCount, setStarCount] = useState('-');

  useEffect(() => {
    fetch('https://api.github.com/repos/szhsin/react-menu')
      .then((response) => response.json())
      .then(({ stargazers_count }) => setStarCount(stargazers_count.toLocaleString('en-US')))
      .catch((err) => console.error(err));
  }, []);

  return (
    <footer id="footer">
      <div className="github">
        <a
          className="github-btn left"
          title="GitHub"
          href="https://github.com/szhsin/react-menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="github-img"
            src={`${basePath}/GitHub-Mark-${isDark ? 'Light-' : ''}32px.png`}
            alt="GitHub"
          />
          Star
        </a>
        <a
          className="github-btn right"
          title="Stargazers"
          href="https://github.com/szhsin/react-menu/stargazers"
          target="_blank"
          rel="noopener noreferrer"
        >
          {starCount}
        </a>
      </div>

      <p>Released under the MIT License.</p>
      <p>Copyright © {new Date().getFullYear()} Zheng Song.</p>
      <p className="build">
        {version}+{build}
      </p>
    </footer>
  );
});
