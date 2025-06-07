import { memo } from 'react';
import { bem } from '../utils';

const blockName = 'promo-spot';

export const PromoSpot = memo(function PromoSpot({ label, title, desc, link }) {
  const modifier = { ...(label && { [label.toLowerCase()]: true }) };
  return (
    <a
      className={bem(blockName, null, modifier)}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      <strong className={bem(blockName, 'title')}>{title}</strong>
      <div className={bem(blockName, 'desc')}>{desc}</div>
    </a>
  );
});
