import DataGetter from './class/DataGetter'
import DeviceData from './class/DeviceData'
import ThreeApp from './three/ThreeApp'

const device = new DeviceData()
const threeApp = new ThreeApp(device.screen)


const data = new DataGetter(_candidate => {
    threeApp.loadCandidate(_candidate)
})