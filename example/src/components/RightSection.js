import { memo } from 'react';
import { useDomInfo } from '../store';
import { Promo } from './Promo';

export const RightSection = memo(function RightSection() {
  return (
    <div className="right-section" style={{ top: (useDomInfo().navbarHeight || 0) + 16 }}>
      <Promo />
    </div>
  );
});
