import Player from "../models/Player.js"
import Fighter from "../models/Fighter.js"

let _player = new Player()
let _computer = new Player()

let fighters = [
    new Fighter('Peasant', 1, 1, 2, 'https://pbs.twimg.com/profile_images/870565294841974784/4IJcii1i_400x400.jpg'),
    new Fighter('Archer', 3, 2, 6, 'https://mbtskoudsalg.com/images/archer-clipart-3.png'),
    new Fighter('Knight', 5, 5, 5, 'https://banner2.kisspng.com/20180215/hpe/kisspng-middle-ages-knight-cartoon-clip-art-knights-cliparts-5a85e534e27536.7056346115187244049276.jpg'),
    new Fighter('Dragon', 11, 10, 8, 'https://banner2.kisspng.com/20180421/wrw/kisspng-bad-dragon-cartoon-youtube-memoflash-ferocious-5adbfe399f3432.9292562315243669056521.jpg')
]

class GameService {
    buyFighter(i) {
        let f = fighters[i]
        if (f) _player.buyFighter(f)
    }
    newGame(cb) {
        _computer = new Player()
        while (_computer.tokens) {
            let i = Math.floor(Math.random() * 4)
            _computer.buyFighter(fighters[i])
        }
        _computer.kingsDead = false
        _player.kingsDead = false
        if (!_player.tokens) _player.tokens = Math.ceil(Math.random() * 24)
        cb(_player)
    }
    constructor() { }
    getFighters(cb) {
        cb(fighters)
    }
    get players() {
        return [_player, _computer]
    }
    setActiveFighters() {
        _computer.setActiveFighter()
        _player.setActiveFighter()
    }
    fight(cb) {
        let enemy = _computer.activeFighter
        _computer.fight(_player.activeFighter)
        _player.fight(enemy)
        cb()
    }
}

export default GameService;