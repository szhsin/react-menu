
export const defineName = (component, name) =>
    Object.defineProperty(component, '__name__', { value: name, writable: false });

export const classSet = (classes) => {
    let className = '';
    for (const c of Object.keys(classes)) {
        if (classes[c]) className += `${c} `;
    }

    return className.trim();
}

export const bem = (block, element, modifiers = {}) => (userClassName) => {
    let blockElement = element ? `${block}__${element}` : block;
    let className = blockElement;
    for (const name of Object.keys(modifiers)) {
        const value = modifiers[name];
        if (value) {
            className += ` ${blockElement}--`;
            className += (value === true ? name : `${name}-${value}`);
        }
    }

    if (typeof userClassName === 'function') {
        className += ` ${userClassName(modifiers)}`;
    } else if (typeof userClassName === 'string') {
        className += ` ${userClassName.trim()}`;
    }

    return className;
}
