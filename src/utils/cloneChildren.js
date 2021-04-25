import React from 'react';
import { getName, isProd } from './utils';

const validateChildren = (parent, child, permitted) => {
    if (!child) return false;
    if (!permitted.includes(getName(child.type))) {
        !isProd && console.warn(`[react-menu] ${child.type || child} is ignored.\n`,
            `The permitted children inside a ${parent} are ${permitted.join(', ')}.`,
            'If you create HOC of these components, you can use the applyHOC or applyStatics helper, see more at: https://szhsin.github.io/react-menu/docs#utils-apply-hoc');
        return false;
    }

    return true;
}

export const cloneChildren = (children, startIndex = 0) => {
    let index = startIndex;
    let descendOverflow = false;
    const permittedChildren = ['MenuDivider', 'MenuGroup', 'MenuHeader', 'MenuItem',
        'FocusableItem', 'MenuRadioGroup', 'SubMenu'];

    const items = React.Children.map(children, child => {
        if (!validateChildren('Menu or SubMenu', child, permittedChildren)) return null;

        switch (getName(child.type)) {
            case 'MenuDivider':
            case 'MenuHeader':
                return child;

            case 'MenuRadioGroup': {
                const permittedChildren = ['MenuItem'];
                const props = { type: 'radio' };

                const radioItems = React.Children.map(child.props.children,
                    radioChild => {
                        if (!validateChildren('MenuRadioGroup', radioChild, permittedChildren)) return null;

                        return radioChild.props.disabled
                            ? React.cloneElement(radioChild, props)
                            : React.cloneElement(radioChild, {
                                ...props,
                                index: index++
                            })
                    });

                return React.cloneElement(child, { children: radioItems });
            }

            case 'MenuGroup': {
                const {
                    items,
                    endIndex,
                    descendOverflow: descOverflow
                } = cloneChildren(child.props.children, index);

                index = endIndex;
                const takeOverflow = Boolean(child.props.takeOverflow);
                // https://stackoverflow.com/questions/3076078/check-if-at-least-two-out-of-three-booleans-are-true
                if (!isProd &&
                    (descendOverflow === descOverflow ? descOverflow : takeOverflow)
                ) throw new Error('[react-menu] Only one MenuGroup in a menu is allowed to have takeOverflow prop.');
                descendOverflow = descendOverflow || descOverflow || takeOverflow;
                return React.cloneElement(child, { children: items });
            }

            default:
                return child.props.disabled
                    ? child
                    : React.cloneElement(child, { index: index++ });
        }
    });

    return { items, endIndex: index, descendOverflow };
}
