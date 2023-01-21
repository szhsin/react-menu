import { memo } from 'react';
import { bem } from '../utils';
import { ExternalLinkIcon } from './Icons';

const blockName = 'promo-spot';

export const PromoSpot = memo(function PromoSpot({ label, title, desc, link }) {
  const modifier = { [label.toLowerCase()]: true };
  return (
    <a
      className={bem(blockName, null, modifier)}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      <div className={bem(blockName, 'label', modifier)}>
        {label}
        <ExternalLinkIcon />
      </div>
      <strong>{title}</strong>
      <div className={bem(blockName, 'desc')}>{desc}</div>
    </a>
  );
});
