export function ExternalLink({ href, children }) {
  return (
    <a className="external-link" target="_blank" rel="noopener noreferrer" href={href}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-external-link"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5"></path>
        <line x1={10} y1={14} x2={20} y2={4}></line>
        <polyline points="15 4 20 4 20 9"></polyline>
      </svg>
    </a>
  );
}
