import gsap from 'gsap';
import * as THREE from 'three'
import GLTFLoader from './GLTFLoader';
import CandidateHeadGraph from './objects/CandidateHeadGraph';
import MainPage from './objects/MainPage';
import OrbitControls from './OrbitControls'
import ThreeConfig from './ThreeConfig';

export default class ThreeApp {
    
    constructor(_screen, _candidatePanel) {
        this.candidatePanel = _candidatePanel
        this.candidatePanel.closePanelHandler = _ => { this.updateCandidateGraphs(false) }
        this.loader = new GLTFLoader()
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color( 0xffffff );
        this.scene.wireframe = true
        this.camera = new THREE.PerspectiveCamera( 75, _screen.width / _screen.height, 0.1, 1000 )

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.inputEncoding = THREE.sRGBEncoding
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.renderer.setSize(_screen.width, _screen.height)
        document.body.appendChild(this.renderer.domElement)

        this.mainLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(this.mainLight)

        this.controls = new OrbitControls( this.camera, this.renderer.domElement )
        this.controls.enableDamping = true

        this.mainPage = new MainPage(this.scene, this.loader)

        this.candidateHeadGraphs = []

        this.camera.position.y = 20
        this.camera.position.z = 2
        this.animate()

        window.addEventListener('resize', _ => this.updateScreenSize())
    }

    updateScreenSize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    loadCandidate(_candidate) {
        this.candidateHeadGraphs.push(new CandidateHeadGraph(_candidate, this.scene, this.loader))
    }

    updateCandidateGraphs(_focus, _index = null) {
        this.candidateHeadGraphs.forEach( _graph => {
            if (_focus && _index != _graph.index) {
                _graph.hide()
            } else {
                _graph.show()
            }
        })
    }

    moveTo(_href) {
        let pos
        let target
        if (_href.startsWith('candidate/')) {
            const i = parseInt(_href.split('/')[1])
            const z = (i) * ThreeConfig.scale
            pos = new THREE.Vector3(20, 2.52, ThreeConfig.position.z + z)
            target = new THREE.Vector3(10, 2.52, ThreeConfig.position.z + z)
            this.candidatePanel.show(i)
            this.updateCandidateGraphs(true, i)
        } else {
            switch (_href) {
                case 'polls':
                    pos = new THREE.Vector3(2.5, 2.52, 15)
                    target = new THREE.Vector3(2.5, 2.52, 0)
                    break
                case 'popularity':
                    pos = new THREE.Vector3(20, 2.52, 4)
                    target = new THREE.Vector3(10, 2.52, 4)
                    break
                case 'global':
                    pos = new THREE.Vector3(20, 7, 10)
                    target = new THREE.Vector3(10, 0, 5)
                    break
                case 'project':
                    pos = new THREE.Vector3(0, 10, -4)
                    target = new THREE.Vector3(0, 0, -5)
                    break
                default:
                    pos = new THREE.Vector3(0, 20, 2)
                    target = new THREE.Vector3(0, 0, 0)
                    break
            }
            this.candidatePanel.close()
            this.updateCandidateGraphs(false)
        }
        gsap.to(this.controls.target, { ...target, duration: 3 })
        gsap.to(this.camera.position, { ...pos, duration: 3 })
    }

    animate() {
        requestAnimationFrame(_ => this.animate())
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
    
}