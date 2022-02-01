export default class Candidate {

    constructor(_name) {
        this.name = _name
        this.id = _name.replace(' ', '_')
        this.polls = []
        this.wikipediaPageViews = []
    }

    setWikipediaData(_stats) {
        this.wikipediaPageViews = Object.fromEntries(_stats.map(_stat => [_stat.timestamp, _stat.views]))
    }

    setPollsData(_data) {
        this.polls = _data
    }

}