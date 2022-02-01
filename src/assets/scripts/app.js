import DataGetter from './class/DataGetter'
import DeviceData from './class/DeviceData'
import ThreeApp from './three/ThreeApp'

const data = new DataGetter()

const device = new DeviceData()
const threeApp = new ThreeApp(device.screen)
