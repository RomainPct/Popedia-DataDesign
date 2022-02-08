import * as THREE from 'three'
// https://r105.threejsfundamentals.org/threejs/lessons/threejs-optimize-lots-of-objects.html

const CONFIG = {
    scale: 1,
    rotation: {
        y: Math.PI * 0.5
    },
    position: {
        x: 3,
        z: 3,
        y: 2
    }
}

export default class CandidateHeadGraph {

    constructor(_candidate, _index, _scene, _loader) {
        _loader.load(
            `/assets/objects/${_candidate.glbName}.glb`,
            (gltf) => {
                const group = new THREE.Group()
                _candidate.results.forEach((_result, _index) => {
                    const head = gltf.scene.clone()
                    head.position.y = (_result.intentions * 0.1) * CONFIG.scale
                    head.position.z = (_index * 0.2) * CONFIG.scale
                    head.position.x = (_candidate.index * -2) * CONFIG.scale
                    // const scale = Math.log2(_result.total) * 0.1
                    const scale = (0.2 + (_result.total * 0.000005)) * CONFIG.scale
                    head.scale.x = scale
                    head.scale.y = scale
                    group.add(head)
                })
                group.rotation.y = CONFIG.rotation.y
                group.position.y = CONFIG.position.y
                group.position.z = CONFIG.position.z
                group.position.x = CONFIG.position.x
                _scene.add(group)
            }
        )
    }

}