//import "bootstrap"; extra tools for js
import { run } from "./app/menu";
import { setPage } from "./app/utils/page";
import "./main.scss";

const playButton = document.getElementById("play-button");
const nameInput = document.getElementById("username-input");

(async () => {
  const DataBase = (await import("./firebase")).DataBase;
  const db = new DataBase();
  db.login();
  
  playButton.onclick = () => {
    setPage("level-page");
    db.setName(nameInput.value);
    run(db.setScore);
  };
})();