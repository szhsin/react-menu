import { forwardRef, useMemo } from 'react';
import { useBEM } from '../hooks';
import { menuClass, radioGroupClass, RadioGroupContext, roleNone } from '../utils';

export const MenuRadioGroup = forwardRef(function MenuRadioGroup(
  { 'aria-label': ariaLabel, className, name, value, onRadioChange, ...restProps },
  externalRef
) {
  const contextValue = useMemo(
    () => ({ name, value, onRadioChange }),
    [name, value, onRadioChange]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <li role={roleNone}>
        <ul
          role="group"
          aria-label={ariaLabel || name || 'Radio group'}
          {...restProps}
          ref={externalRef}
          className={useBEM({ block: menuClass, element: radioGroupClass, className })}
        />
      </li>
    </RadioGroupContext.Provider>
  );
});
