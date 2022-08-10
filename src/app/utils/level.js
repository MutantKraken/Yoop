//0 empty
//1 wall
//2 goal
//3+ obstical

export function findId(layout, id) {
  for (var r = 0; r < layout.length; r++) {
    for (var c = 0; c < layout[0].length; c++) {
      if (layout[r][c] === id) {
        return [r, c];
      }
    }
  }
  return undefined;
}

export function boundingId (layout, id) {
  const base = findId(layout, id);
  var rMin = base[0];
  var rMax = base[0];
  var cMin = base[1];
  var cMax = base[1];
  
  for (var r = 0; r < layout.length; r++) {
    for (var c = 0; c < layout[0].length; c++) {
      if (layout[r][c] !== id) {
        continue;
      }
      if (r < rMin) {
        rMin = r;
      }else if (r > rMax) {
        rMax = r;
      }
      if (c < cMin) {
        cMin = c;
      }else if (c > cMax) {
        cMax = c;
      }
    }
  }
  return [rMin, rMax, cMin, cMax];
}

function calculateMaxId(layout) {
  var max = 0;
  for (var r = 0; r < layout.length; r++) {
    for (var c = 0; c < layout[0].length; c++) {
      if (layout[r][c] > max) {
        max = layout[r][c];
      }
    }
  }
  return max;
}

export class Level {
  constructor (arr, maxId) {
    this.layout = arr;
    this.rows = arr.length;
    this.cols = arr[0].length;
    this.maxId = calculateMaxId(arr);
  }
}

export const levels = [
  new Level([
    [1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 2, 0, 0, 0, 0, 0, 1], 
    [1, 2, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 3, 3, 3, 3, 0, 0, 1], 
    [1, 0, 1, 1, 1, 1, 1, 1],
  ]),
  new Level([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 4, 4, 4, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 3, 3, 3, 1],
    [1, 1, 1, 1, 0, 1, 1, 1],
  ]),
  new Level([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 5, 5, 0, 1],
    [1, 4, 4, 4, 3, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
  ]),
  new Level([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 5, 5, 0, 1],
    [1, 4, 4, 4, 3, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 3, 0, 0, 1],
    [1, 6, 6, 6, 0, 0, 0, 1],
    [1, 0, 0, 0, 7, 0, 0, 1],
    [1, 0, 0, 0, 7, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1],
  ]),
  new Level([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 1],
    [1, 0, 0, 0, 4, 10, 10, 10, 10, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 5, 5, 5, 5, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]),
];
      
export const levelCount = levels.length;