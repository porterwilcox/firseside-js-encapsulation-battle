import GameService from "./game-service.js"

const gameService = new GameService()

function drawPlayerSelect(player) {
    if (!player) player = gameService.players[0]
    let template = `
    <div class="col-10 text-center text-danger">
        <h1>Battle Royal!</h1>
        <h2>Choose your army!</h2>
        <h2>Tokens remaining: ${player.tokens}</h2>
    </div>
    <div id="start-btn" class="col-2 d-flex align-items-center"></div>
    <div class="row w-100 disabled">
    `
    template += drawFighters(player.army, true) + '</div>'
    document.getElementById('bottom').innerHTML = template
    if (!player.tokens) document.getElementById("start-btn").innerHTML = `
        <button onclick="app.controllers.gameController.setActiveFighters()" class="btn btn-danger">FIGHT!</button>
    `
}

function drawFighters(arr, myArmy) {
    let template = ``
    for (let i = 0; i < arr.length; i++) {
        let f = arr[i];
        template += `
        <div onclick="app.controllers.gameController.buyFighter(${i})" class="col-3 card clickable">
            <img src="${f.image}" class="fighter-img card-img-top" />
            <div class="card-body">
                <h3 class="card-title">${f.name}</h3>
                <hr>
                <h5 class="card-text">Cost: ${f.cost}</h5>
                <h5 class="card-text">Health: ${f.health}</h5>
                <h5 class="card-text">Damage: ${f.damage}</h5>
            </div>
        </div>
        `
    }
    if (myArmy) return template
    document.getElementById('top').innerHTML = template
}

function drawGameControls() {
    let template = `
    <div onclick="app.controllers.gameController.fight()" class="col-10 offset-1 clickable mt-5 bg-danger text-white d-flex justify-content-center align-items-center">
        <h1>Attack!</h1>
    </div>
    `
    document.getElementById('bottom').innerHTML = template
}

function drawActiveFighters() {
    let players = gameService.players
    if (players[1].kingsDead) {
        gameService.newGame(drawPlayerSelect)
        gameService.getFighters(drawFighters)
        return
    }
    if (players[0].kingsDead) {
        document.getElementById('app').innerHTML = `
            <h1>Game Over</h1>
        `
        return
    }
    let template = ''
    let bgTrick = 0
    players.forEach(p => {
        let f = p.activeFighter
        template += `
        <div class="col-6 card bg-trick-${bgTrick}">
            <img src="${f.image}" class="fighter-img card-img-top" />
            <div class="card-body">
                <h3 class="card-title">${f.name}</h3>
                <hr>
                <h5 class="card-text">Health: ${f.health}</h5>
                <h5 class="card-text">Damage: ${f.damage}</h5>
            </div>
        </div>
        `
        bgTrick++
    })
    document.getElementById('top').innerHTML = template
}

class GameController {
    constructor() {
        gameService.newGame(drawPlayerSelect)
        gameService.getFighters(drawFighters)
    }
    buyFighter(i) {
        gameService.buyFighter(i)
        drawPlayerSelect()
    }
    setActiveFighters() {
        gameService.setActiveFighters()
        drawActiveFighters()
        drawGameControls()
    }
    fight() {
        gameService.fight(drawActiveFighters)
    }
}

export default GameController;