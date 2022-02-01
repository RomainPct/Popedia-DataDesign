// https://r105.threejsfundamentals.org/threejs/lessons/threejs-optimize-lots-of-objects.html

export default class CandidateHeadGraph {

    constructor(_candidate, _scene, _loader) {
        _loader.load(
            `/assets/objects/${_candidate.id}.glb`,
            (gltf) => {
                _candidate.results.forEach((_result, _index) => {
                    const head = gltf.scene.clone()
                    head.position.y = 3 + _result.intentions * 0.1
                    head.position.z = _index * 0.2
                    const scale = _result.total * 0.00002
                    head.scale.x = scale
                    head.scale.y = scale
                    _scene.add(head)
                })
            }
        )
    }

}