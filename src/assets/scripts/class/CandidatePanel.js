export default class CandidatePanel {

    constructor(_data) {
        this.elem = document.querySelector('#js-candidatePanel')
        this.title = this.elem.querySelector('h1')
        this.frame = this.elem.querySelector('iframe')
        this.elem.querySelector('#js-closeCandidatePanel').addEventListener('click', _e => { this.close(_e) })
        this.data = _data
    }

    show(_i) {
        const candidate = this.data.getCandidate(_i)
        const url = `https://fr.m.wikipedia.org/wiki/${candidate.id}`
        this.frame.setAttribute('src', url)
        this.title.innerText = candidate.name
        this.elem.classList.add('open')
    }

    close(_e = null) {
        if (_e) _e.preventDefault()
        this.elem.classList.remove('open')
        this.closePanelHandler()
    }

}