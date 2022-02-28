import * as THREE from 'three'
import ThreeConfig from '../ThreeConfig'
// https://r105.threejsfundamentals.org/threejs/lessons/threejs-optimize-lots-of-objects.html

export default class CandidateHeadGraph {

    constructor(_candidate, _scene, _loader) {
        this.group = null
        this.index = _candidate.index
        _loader.load(
            `/assets/objects/${_candidate.glbName}.glb`,
            (gltf) => {
                this.group = new THREE.Group()
                _candidate.results.forEach((_result, _index) => {
                    const head = gltf.scene.clone()
                    head.position.y = (_result.intentions * 0.1) * ThreeConfig.scale
                    head.position.z = (_index * 0.4) * ThreeConfig.scale
                    head.position.x = (_candidate.index * -1) * ThreeConfig.scale
                    // const scale = Math.log2(_result.total) * 0.1
                    const scale = (0.2 + (_result.total * 0.000005)) * ThreeConfig.scale
                    head.scale.x = scale
                    head.scale.y = scale
                    this.group.add(head)
                })
                this.group.rotation.y = ThreeConfig.rotation.y
                this.group.position.y = ThreeConfig.position.y
                this.group.position.z = ThreeConfig.position.z
                this.group.position.x = ThreeConfig.position.x
                _scene.add(this.group)
            }
        )
    }

    setOpacity(obj, opacity) {
        obj.children.forEach((child)=>{
          this.setOpacity(child, opacity)
        })
        if (obj.material) {
          obj.material.opacity = opacity
          obj.material.transparent = true
          obj.material.format = THREE.RGBAFormat
        }
    }

    show() {
        this.setOpacity(this.group, 1)
    }

    hide() {
        this.setOpacity(this.group, 0.1)
    }

}