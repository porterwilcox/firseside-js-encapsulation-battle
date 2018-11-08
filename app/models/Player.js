class Player {
    constructor() {
        this.tokens = 20,
        this.army = []
        this.activeFighter = {}
        this.kingsDead = false
    }
    buyFighter(f) {
        if (f.cost > this.tokens) return
        this.tokens -= f.cost
        this.army.push(f)
    }
    setActiveFighter() {
        if (!this.army.length) {
            this.kingsDead = true
            return
        }
        let i = Math.floor(Math.random() * this.army.length)
        this.activeFighter = JSON.parse(JSON.stringify(this.army.splice(i, 1).pop())) 
    }
    fight(enemy) {
        this.activeFighter.health -= enemy.damage
        if (this.activeFighter.health <= 0) {
            this.setActiveFighter()
        }
    }
}

export default Player;