import { memo } from 'react';
import { PromoSpot } from './PromoSpot';

export const Promo = memo(function Promo() {
  return (
    <div>
      <PromoSpot
        title="Autocomplete"
        desc="1.4 kB headless React autocomplete solution"
        link="https://szhsin.github.io/react-autocomplete/"
      />
      <PromoSpot
        title="Accordion"
        desc="The complete accordion solution for React"
        link="https://szhsin.github.io/react-accordion/"
      />
      <PromoSpot
        title="Transition"
        desc="Tiny React transition state machine"
        link="https://github.com/szhsin/react-transition-state"
      />
      <PromoSpot
        title="State Management"
        desc="Simple, atomic state management for React"
        link="https://github.com/szhsin/reactish-state"
      />
    </div>
  );
});
