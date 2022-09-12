import { memo } from 'react';
import { bem } from '../utils';
import { ExternalLinkIcon } from './Icons';

const blockName = 'promo-spot';

export const PromoSpot = memo(function PromoSpot() {
  return (
    <a
      className={bem(blockName)}
      target="_blank"
      rel="noopener noreferrer"
      href="https://szhsin.github.io/react-accordion/"
    >
      <div className={bem(blockName, 'label')}>
        NEW
        <ExternalLinkIcon />
      </div>
      <strong>React-Accordion</strong>
      <div className={bem(blockName, 'desc')}>Accessible, unstyled, headless UI accordion</div>
    </a>
  );
});
