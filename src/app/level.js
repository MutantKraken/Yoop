//0 empty
//1 wall
//2 goal
//3+ obstical
export class Level {
  constructor (arr) {
    this.layout = arr;
    this.height = arr.length;
    this.width = arr[0].length;
    this.moveX = 0;
    this.moveY = 0;
  }
}

export const levelCount = 1;

export const level1 = new Level([ [1, 1, 1, 1, 1, 1, 1, 1], 
                                  [1, 0, 0, 0, 0, 0, 0, 1], 
                                  [1, 0, 0, 0, 0, 0, 0, 1], 
                                  [1, 0, 0, 0, 2, 0, 0, 1], 
                                  [1, 0, 0, 0, 2, 0, 0, 1], 
                                  [1, 0, 0, 0, 0, 0, 0, 1], 
                                  [1, 0, 0, 0, 0, 0, 0, 1], 
                                  [1, 1, 1, 1, 0, 1, 1, 1], ]);