export default class MainPage {

    constructor(_scene, _loader) {
        _loader.load(
            '/assets/objects/wikipedia.glb',
            (gltf) => {
                // console.log(gltf)
                _scene.add(gltf.scene)
            }
        )
    }

}