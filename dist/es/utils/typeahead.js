var typeahead = function typeahead(item, key, mutableState, sortItems, setHoverItem) {
  if (key < 'a' || key > 'z') return false;
  console.log('typeahead', key);
  sortItems();
  var items = mutableState.items,
      hoverIndex = mutableState.hoverIndex;
  var index = hoverIndex < 0 ? items.indexOf(item) : hoverIndex;
  console.log('index', index);
  var count = 0;

  for (var i = index + 1; i !== index; i++, count++) {
    var _text$;

    if (count >= items.length) break;
    i = i % items.length;
    console.log('i:', i);
    var text = items[i].textContent;

    if (((_text$ = text[0]) == null ? void 0 : _text$.toLowerCase()) === key) {
      mutableState.hoverIndex = i;
      setHoverItem(items[i]);
      break;
    }
  }

  return true;
};

export { typeahead };
