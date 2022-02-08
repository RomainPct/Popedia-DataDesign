export default class Overlay {

    constructor(_threeApp) {
        this.viewLinks = document.querySelectorAll('nav a')
        this.viewLinks.forEach(_link => {
            _link.addEventListener('click', _e => {
                _e.preventDefault()
                _threeApp.moveTo(_link.getAttribute('href'))
            })
        })
    }

}