const multiply = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number' ||  isNaN(a) || isNaN(b)) {
    return null;
  }
  return a * b;
}

const multiplyBy10 = (a, b) => multiply.call(null, 10, b);
