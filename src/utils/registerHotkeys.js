const registerHotkeys = (keys, isLetterhead) => (onClick, setHover, isParentOpen) => () => {
  function logKey(e) {
    console.log('keydown', e.key);
    // if (!isParentOpen) return;
    if (e.key === keys) {
      setHover();
      !isLetterhead && setTimeout(() => onClick(e), 100);
    }
  }

  if (!isParentOpen) return;
  console.log('add', keys);
  document.addEventListener('keydown', logKey);

  return () => {
    console.log('cleanup', keys);
    document.removeEventListener('keydown', logKey);
  };
};

export { registerHotkeys };
