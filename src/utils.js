export const classSet = (classes) => {
    let className = '';
    for (const c of Object.keys(classes)) {
        if (classes[c]) className += `${c} `;
    }

    return className.trim();
}
