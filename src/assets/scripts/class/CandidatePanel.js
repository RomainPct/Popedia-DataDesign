import Chartist from "chartist"

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
        const options = {
            fullWidth: true,
            showPoint: false,
            showGridBackground: false,
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            height: 120
        }
        new Chartist.Line('#js-candidatePanelChart', {
            labels: candidate.labels,
            series: [
                candidate.polls
            ]
        }, {...options, low: 0, high: 50, axisY: {
            labelInterpolationFnc: (_val) => {
              return `${_val}%`
            }
        }})
        new Chartist.Line('#js-candidatePanelChartWiki', {
            labels: candidate.labels,
            series: [
                candidate.chartWikipediaWeeklyViews
            ]
        }, {...options, low: 0, axisY: {
            labelInterpolationFnc: (_val) => {
              return `${_val / 1000}k`
            }
        }})
        this.title.innerText = candidate.name
        this.elem.classList.add('open')
    }

    close(_e = null) {
        if (_e) _e.preventDefault()
        this.elem.classList.remove('open')
        this.closePanelHandler()
    }

}