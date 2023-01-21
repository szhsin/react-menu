import { memo, useContext } from 'react';
import { DomInfoContext } from '../utils';
import { Promo } from './Promo';

export const RightSection = memo(function RightSection() {
  return (
    <div
      className="right-section"
      style={{ top: (useContext(DomInfoContext).navbarHeight || 0) + 16 }}
    >
      <Promo />
    </div>
  );
});
