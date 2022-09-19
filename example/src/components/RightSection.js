import { memo, useContext } from 'react';
import { DomInfoContext } from '../utils';
import { PromoSpot } from './PromoSpot';

export const RightSection = memo(function RightSection() {
  return (
    <div className="right-section" style={{ top: useContext(DomInfoContext).navbarHeight + 16 }}>
      <PromoSpot />
    </div>
  );
});
