import React, { useState, useEffect, useRef } from 'react';
import { useSnapshot } from 'reactish-state';
import { bem } from '../utils';
import { isTocOpenState, useDomInfo, useTheme } from '../store';
import { TableContentsList } from './TableContentsList';
import { Logo } from './Logo';
import { ThemeSwitch } from './ThemeSwitch';

const blockName = 'table-contents';

export const TableContents = React.memo(function TableContents({ children }) {
  const ref = useRef(null);
  const headerRef = useRef(null);
  const domInfo = useDomInfo();
  const { theme } = useTheme();
  const isTocOpen = useSnapshot(isTocOpenState);
  const [maxHeight, setMaxHeight] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    if (isTocOpen) ref.current.focus();
  }, [isTocOpen]);

  useEffect(() => {
    if (!domInfo.navbarHeight) return;
    const offset = isTocOpen ? headerRef.current.offsetHeight : domInfo.navbarHeight;
    setMaxHeight(domInfo.vHeight - offset);

    setTop(
      getComputedStyle(document.querySelector('.table-contents')).getPropertyValue('position') ===
        'sticky'
        ? domInfo.navbarHeight
        : undefined
    );
  }, [domInfo, isTocOpen]);

  const handleClose = (e) => {
    if (e.currentTarget === e.target) isTocOpenState.set(false);
  };

  return (
    <aside
      className={bem(blockName, null, { open: isTocOpen, theme })}
      style={{ top }}
      onTouchStart={handleClose}
      onClick={handleClose}
      onKeyDown={(e) => e.key === 'Escape' && isTocOpenState.set(false)}
    >
      <nav aria-label="Table of contents" tabIndex="-1" ref={ref}>
        <div className={bem(blockName, 'header')} ref={headerRef}>
          <Logo />
          <ThemeSwitch />
        </div>
        <TableContentsList list={children} maxHeight={maxHeight} />
      </nav>
    </aside>
  );
});
