var registerHotkeys = function registerHotkeys(keys, isLetterhead) {
  return function (onClick, setHover, isParentOpen) {
    return function () {
      function logKey(e) {
        console.log('keydown', e.key);

        if (e.key === keys) {
          setHover();
          !isLetterhead && setTimeout(function () {
            return onClick(e);
          }, 100);
        }
      }

      if (!isParentOpen) return;
      console.log('add', keys);
      document.addEventListener('keydown', logKey);
      return function () {
        console.log('cleanup', keys);
        document.removeEventListener('keydown', logKey);
      };
    };
  };
};

export { registerHotkeys };
