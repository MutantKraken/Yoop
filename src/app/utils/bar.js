import { findId } from "./level";
import { velocity } from "./game";

export class Bar {
  constructor(id, cube, rlen, clen) {
    this.id = id;
    this.cube = cube;
    this.rlen = rlen;
    this.clen = clen;
    this.rVel = 0;
    this.cVel = 0;
  }
  update() {
    this.cube.translate(this.rVel, 0, this.cVel);
  }
  still() {
    this.rVel = 0;
    this.cVel = 0;
  }
  nextDir(layout, direction) {
    var pos = findId(layout, this.id);
    while (layout[pos[0]][pos[1]] === this.id) {
      pos[0] += direction[0];
      pos[1] += direction[1];
      if (pos[0] < 0 || pos[1] < 0 || pos[0] === layout.length || pos[1] === layout[0].length) {
        return undefined;
      }
    }
    return [pos[0], pos[1]];
  }
  updateLayout(layout, direction) {
    if (this.cVel === 0 && this.rVel === 0) {
      return layout;
    }
    const add = this.nextDir(layout, direction);
    const remove = this.nextDir(layout, [-direction[0], -direction[1]]);
    remove[0] += direction[0];
    remove[1] += direction[1];
    layout[add[0]][add[1]] = this.id;
    layout[remove[0]][remove[1]] = 0;
    return layout;
  }
  calcVelocity(layout, direction) {
    if (direction[1] !== 0 && this.rlen > 1) {
      return false;
    }
    if (direction[0] !== 0 && this.clen > 1) {
      return false;
    }
    const pos = this.nextDir(layout, direction);
    if (pos === undefined) {
      return true;
    }
    if (layout[pos[0]][pos[1]] === 0) {
      this.rVel = direction[0]*velocity;
      this.cVel = direction[1]*velocity;
    }
    return false;
  }
}