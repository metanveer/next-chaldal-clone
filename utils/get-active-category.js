export function getActiveCategory(parents, length, id) {
  if (length === 3) {
    return {
      one: parents[2],
      two: parents[1],
      three: parents[0],
      four: id,
    };
  }
  if (length === 2) {
    return {
      one: parents[1],
      two: parents[0],
      three: id,
      four: null,
    };
  }
  if (length === 1) {
    return {
      one: parents[0],
      two: id,
      three: null,
      four: null,
    };
  }
  if (length === 0) {
    return {
      one: id,
      two: null,
      three: null,
      four: null,
    };
  }
}
