// Check for upper case letters
const isUpperCase = (str) => {
  const regexp = /^[A-Z]/;
  return regexp.test(str);
};

// Based on a opening tag, return the closing tag
const getClosingTag = (tag) => {
  if(tag === undefined) return;

  const arrTag = tag.split("");
  arrTag.splice(1, 0, "/");
  return arrTag.join("");
};

const checkTags = (toTest) => {
  let error;
  const stack = [];
  for (let cp = 0; cp < toTest.length; cp++) {
    const c = toTest[cp];
    const nextC = (cp + 1 < toTest.length) ? toTest[cp + 1] : undefined;

    if (c === "<" && nextC !== "/" && isUpperCase(nextC)) {
      let nextPos = cp + 1;
      let tag = c;
      while (nextPos < toTest.length && toTest[nextPos] !== ">") {
        tag += toTest[nextPos];
        nextPos += 1;
      }
      tag += toTest[nextPos];
      stack.push(tag);
    }

    if (c === "<" && nextC === "/") {
      let nextPos = cp + 2;
      const tail = stack.pop();
      let closingTag = c + nextC;
      while (nextPos < toTest.length && toTest[nextPos] !== ">") {
        closingTag += toTest[nextPos];
        nextPos += 1;
      }
      closingTag += toTest[nextPos];

      const expectedClosing = getClosingTag(tail);
      if (expectedClosing !== closingTag) {
        cp = toTest.length;
        error = {expected: expectedClosing, actual: closingTag}
      }
    }
  }

  if (stack.length > 0 && error === undefined) {
    const tail = stack.pop();
    const expectedClosing = getClosingTag(tail);
    error = {expected: expectedClosing, actual: undefined}
  }

  if (error === undefined) {
    return "Correctly tagged paragraph";
  } else {
    const { expected, actual } = error;
    return `Expected ${expected || "#"} found ${actual || "#"}`;
  }
};

module.exports = checkTags;


