import Candidate from "./Candidate"

const CANDIDATES = [
    'Marine Le Pen',
    'Jean-Luc Mélenchon',
    'Anne Hidalgo',
    'Eric Zemmour',
    'Emmanuel Macron',
    'Christiane Taubira',
    'Valérie Pécresse',
    'Yannick Jadot',
    'Fabien Roussel'
]

const START_DATE = new Date('2021-01-01');
const END_DATE = new Date();

export default class DataGetter {

    constructor() {
        this.candidates = CANDIDATES.map(_candidate => new Candidate(_candidate))
        this.polls = []
        this.fetchPollResults()
        this.fetchWikipediaPageViews()
    }

    formatDate(_d) {
        let month = '' + (_d.getMonth() + 1),
            day = '' + _d.getDate(),
            year = _d.getFullYear();
    
        if (month.length < 2)  month = '0' + month
        if (day.length < 2)  day = '0' + day
    
        return [year, month, day].join('')
    }

    fetchWikipediaPageViews() {
        const start = this.formatDate(START_DATE)
        const end = this.formatDate(END_DATE)
        this.candidates.forEach(_candidate => {
            const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/fr.wikipedia/all-access/all-agents/${_candidate.id}/daily/${start}/${end}`
            fetch(url)
                .then(_data => _data.json())
                .then(_stats => _candidate.setWikipediaData(_stats.items))
        })
    }

    fetchPollResults() {
        const url = 'https://raw.githubusercontent.com/nsppolls/nsppolls/master/presidentielle.json'
        let candidatesData = Object.fromEntries(CANDIDATES.map(_candidate => [_candidate, []]))
        fetch(url)
            .then(_data => _data.json())
            .then(_polls => {
                _polls.sort((_a, _b) => ( _a.fin_enquete >= _b.fin_enquete ))
                this.polls = _polls
                _polls.forEach( (_poll, _pollIndex) => {
                    const date = new Date(_poll.fin_enquete)
                    if (date < START_DATE) return
                    const ts = date.getTime()
                    _poll.tours[0].hypotheses[0].candidats.forEach(_candidatResult => {
                        if (!candidatesData.hasOwnProperty(_candidatResult.candidat)) return
                        candidatesData[_candidatResult.candidat].push({
                            ..._candidatResult,
                            timestamp: ts,
                            pollIndex: _pollIndex
                        })
                    })
                })
                this.candidates.forEach(_candidate => {
                    _candidate.setPollsData(candidatesData[_candidate.name])
                })
            })
    }

}