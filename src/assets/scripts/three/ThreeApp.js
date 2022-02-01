import * as THREE from 'three'
import GLTFLoader from './GLTFLoader';
import CandidateHeadGraph from './objects/CandidateHeadGraph';
import MainPage from './objects/MainPage';
import OrbitControls from './OrbitControls'

export default class ThreeApp {
    
    constructor(_screen) {
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

        this.mainPage = new MainPage(this.scene, this.loader)

        this.candidateHeadGraphs = []

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
        this.cube = new THREE.Mesh(geometry, material)
        this.cube.position.y = 3
        this.scene.add(this.cube)

        this.camera.position.y = 16
        this.camera.rotation.x = Math.PI * -0.5
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

    animate() {
        requestAnimationFrame(_ => this.animate())
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        // this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
    
}