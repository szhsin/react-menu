import { memo } from 'react';
import { ExternalLinkIcon } from './Icons';

export const ExternalLink = memo(({ href, children }) => (
  <a className="external-link" target="_blank" rel="noopener noreferrer" href={href}>
    {children}
    <ExternalLinkIcon />
  </a>
));
