import * as THREE from 'three'
import OrbitControls from './OrbitControls'

export default class ThreeApp {
    
    constructor(_screen) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, _screen.width / _screen.height, 0.1, 1000 )

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(_screen.width, _screen.height)
        document.body.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls( this.camera, this.renderer.domElement )

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)

        this.camera.position.z = 5
        this.animate()
    }

    animate() {
        requestAnimationFrame(_ => this.animate())
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
    
}