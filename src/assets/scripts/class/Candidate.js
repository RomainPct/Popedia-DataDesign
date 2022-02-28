export default class Candidate {

    constructor(_name, _index, _candidateHandler) {
        this.name = _name
        this.index = _index
        this.pollName = this.name.replace('É','E')
        this.id = _name.replace(/ /g, '_')
        this.glbName = this.id.replace('É','E').replace('é','e').replace('é','e')
        console.log(this.glbName)
        this.polls = null
        this.wikipediaWeeklyViews = null
        this.chartWikipediaWeeklyViews = null
        this.labels = []
        this.candidateHandler = _candidateHandler
    }

    hasLoadedSomethingNew() {
        if (!this.polls) return
        if (!this.wikipediaWeeklyViews) return
        this.organizePollResultsByWeek()
        this.candidateHandler(this)
    }

    organizePollResultsByWeek() {
        let pollIndex = 0
        this.results = this.wikipediaWeeklyViews.map( (_data, _index) => {
            _data.intentions = this.polls[_index]
            return _data
        })
    }

    setWikipediaData(_stats) {
        const length = _stats.length
        this.wikipediaWeeklyViews = []
        this.chartWikipediaWeeklyViews = []
        let lastLabel = null
        for (let i = 0; i < length; i+=7) {
            if (i + 7 > length) break
            const total = (_stats[i].views + _stats[i+1].views + _stats[i+2].views + _stats[i+3].views + _stats[i+4].views + _stats[i+5].views + _stats[i+6].views)
            this.wikipediaWeeklyViews.push({
                total: total,
                timestamp: _stats[i].timestamp
            })
            this.chartWikipediaWeeklyViews.push(total) 
            const label = _stats[i].timestamp.substring(0, 4)
            if (lastLabel == label) {
                this.labels.push(null)
            } else {
                lastLabel = label
                this.labels.push(label)
            }
        }
        this.hasLoadedSomethingNew()
    }

    setPollsData(_data, _startDate, _endDate) {
        this.polls = []
        let date = new Date(_startDate.getTime())
        let dataIndex = 0
        while (date <= _endDate) {
            let running = true
            let results = []
            date.setDate(date.getDate() + 7)
            while (running) {
                if (dataIndex >= _data.length) break
                if (date.getTime() > _data[dataIndex].timestamp) {
                    results.push(_data[dataIndex])
                    dataIndex += 1
                } else {
                    running = false
                }
            }
            if (results.length > 0) {
                this.polls.push(results.map(_poll => _poll.intentions).reduce((_a, _b) => _a + _b) / results.length)
            } else {
                const lastPoll = this.polls[this.polls.length - 1]
                this.polls.push(lastPoll ?? 0)
            }
        }
        this.hasLoadedSomethingNew()
    }

}