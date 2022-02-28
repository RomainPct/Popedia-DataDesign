import CandidatePanel from './class/CandidatePanel'
import DataGetter from './class/DataGetter'
import DeviceData from './class/DeviceData'
import Overlay from './class/Overlay'
import ThreeApp from './three/ThreeApp'

const device = new DeviceData()

const data = new DataGetter()
const candidatePanel = new CandidatePanel(data)

const threeApp = new ThreeApp(device.screen, candidatePanel)

data.load( _candidate => {
    threeApp.loadCandidate(_candidate)
})

const overlay = new Overlay(threeApp)