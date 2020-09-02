function getWindow(el: Document) {
  return el.nodeType === 9 && el.defaultView;
}

function offset(el: Element) {
  const doc = el.ownerDocument;
  if (!doc) {
    return {
      top: 0,
      left: 0,
    };
  }

  const docEl = doc.documentElement;
  const win = getWindow(doc);
  let box = { top: 0, left: 0 };

  if (typeof el.getBoundingClientRect !== typeof undefined) {
    box = el.getBoundingClientRect();
  }

  return {
    top: box.top + (!!win ? win.pageYOffset : 0) - docEl.clientTop,
    left: box.left + (!!win ? win.pageXOffset : 0) - docEl.clientLeft,
  };
}

export default offset;
