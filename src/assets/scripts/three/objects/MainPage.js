import GLTFLoader from './../GLTFLoader'

export default class MainPage {

    constructor(_scene) {
        this.loader = new GLTFLoader()
        this.loader.load(
            '/assets/objects/wikipedia.glb',
            (gltf) => {
                // console.log(gltf)
                _scene.add(gltf.scene)
            }
        )
    }

}