export default class Expirable {
    constructor() {
        this._expirationDate = new Date()

        this.entryDate = new Date()
        this.startDate = new Date()
        this.category = 'expirable'
        this.lifeSpan = 0
    }

    get expirationDate() {
        return this._expirationDate || this.startDate + this.lifeSpan
    }

    set expirationDate(date) {
        this._expirationDate = date
    }
}
