import DataGetter from './class/DataGetter'
import DeviceData from './class/DeviceData'
import Overlay from './class/Overlay'
import ThreeApp from './three/ThreeApp'

const device = new DeviceData()
const threeApp = new ThreeApp(device.screen)

const overlay = new Overlay(threeApp)

const data = new DataGetter( _candidate => {
    threeApp.loadCandidate(_candidate)
})