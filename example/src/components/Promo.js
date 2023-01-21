import { memo } from 'react';
import { PromoSpot } from './PromoSpot';

export const Promo = memo(function Promo() {
  return (
    <div>
      <PromoSpot
        label="NEW"
        title="Reactish-State"
        desc="Simple, decentralized state management for React"
        link="https://github.com/szhsin/reactish-state"
      />
      <PromoSpot
        label="Similar"
        title="React-Accordion"
        desc="Accessible, unstyled, headless accordion"
        link="https://szhsin.github.io/react-accordion/"
      />
    </div>
  );
});
