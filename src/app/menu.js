import { init, setLib, start } from "./utils/graphics";
import { levelCount } from "./utils/level";
import { setPage } from "./utils/page";

function beginLevel(level) {
  setPage("game-page");
  start(level);
}

function toLevelSelect() {
  setPage("level-page");
  stop();
}

function constructLevelSelect() {
  for (var i = 0; i < levelCount; i++) {
    document.getElementById("buttons-wrapper").innerHTML += '<br><br><button type="button" class="btn btn-primary level-button">'+(i+1)+'</button>';
  }
  for (var i = 0; i < levelCount; i++) {
    ((level) => {
      document.getElementsByClassName("level-button")[level].onclick = () => {
          beginLevel(level+1);
      }
    })(i);
  }
}

export const run = (setScore) => {
  constructLevelSelect();
  document.getElementById("back-level-select").onclick = () => {
    toLevelSelect();
  }
  (async () => {
    const THREE = await import("three");
    const OrbitControls = (await import("three/examples/jsm/controls/OrbitControls")).OrbitControls;
    setLib(THREE, OrbitControls);
    init();
  })();
};