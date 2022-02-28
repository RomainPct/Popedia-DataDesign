export default class MainPage {

    constructor(_scene, _loader) {
        _loader.load(
            '/assets/objects/ekipedia.glb',
            (gltf) => {
                // console.log(gltf)
                _scene.add(gltf.scene)
            }
        )
    }

}