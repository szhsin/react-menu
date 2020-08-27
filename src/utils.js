export const menuContainerClass = 'rc-menu-container';
export const menuClass = 'rc-menu';
export const menuButtonClass = 'rc-menu-button';
export const menuItemClass = 'item';

export const classSet = (classes) => {
    let className = '';
    for (const c of Object.keys(classes)) {
        if (classes[c]) className += `${c} `;
    }

    return className.trim();
}

export const bem = (block, element, ...modifiers) => {
    let blockElement = element ? `${block}__${element}`: block;
    let className = blockElement;
    for (const [name, value] of modifiers) {
        if (value) {
            className += ` ${blockElement}--`;
            className += (value === true ? name : `${name}-${value}`);
        }
    }

    return className;
}
