

const typeahead = (item, key, mutableState, sortItems, setHoverItem) => {
  if (key < 'a' || key > 'z') return false;
  console.log('typeahead', key);
  sortItems();
  const { items, hoverIndex } = mutableState;
  const index = hoverIndex < 0 ? items.indexOf(item) : hoverIndex;
  console.log('index', index);
  let count = 0;
  for (let i = index + 1; i !== index; i++, count++) {
    if (count >= items.length) break;
    i = i % items.length;
    console.log('i:', i);
    const text = items[i].textContent;

    if (text[0]?.toLowerCase() === key) {
      mutableState.hoverIndex = i;
      setHoverItem(items[i]);
      break;
    }
  }

  return true;
};

export { typeahead };
