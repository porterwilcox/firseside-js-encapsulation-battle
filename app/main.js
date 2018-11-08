import GameController from "./components/game-controller.js";

class App {
    constructor() {
        this.controllers = {
            gameController: new GameController()
        }
    }
}
// @ts-ignore
window.app = new App()