import React, { forwardRef, useMemo } from 'react';
import { any, string, func } from 'prop-types';
import { useBEM, useFlatStyles } from '../hooks';
import { stylePropTypes, menuClass, radioGroupClass, RadioGroupContext } from '../utils';

export const MenuRadioGroup = forwardRef(function MenuRadioGroup(
  { 'aria-label': ariaLabel, className, styles, name, value, onRadioChange, ...restProps },
  externalRef
) {
  const contextValue = useMemo(
    () => ({ name, value, onRadioChange }),
    [name, value, onRadioChange]
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <li role="presentation">
        <ul
          role="group"
          aria-label={ariaLabel || name || 'Radio group'}
          {...restProps}
          ref={externalRef}
          className={useBEM({ block: menuClass, element: radioGroupClass, className })}
          style={useFlatStyles(styles)}
        />
      </li>
    </RadioGroupContext.Provider>
  );
});

MenuRadioGroup.propTypes = {
  ...stylePropTypes(),
  name: string,
  value: any,
  onRadioChange: func
};
