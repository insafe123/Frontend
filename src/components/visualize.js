import React, { useState } from 'react';
import * as THREE from 'three';

function VisualizeComponent(props) {
  const [loaded, setLoaded] = useState(false);

  const sceneRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const loadModel = () => {
    const loader = new THREE.ObjectLoader();
    loader.load(
      props.modelUrl,
      (object) => {
        // Add the loaded object to the scene
        sceneRef.current.add(object);

        // Set the camera position and target
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const distance = Math.max(size.x, size.y, size.z);
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(center.x, center.y, distance * 2.5);
        camera.lookAt(center);

        // Set the renderer size and render the scene
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(sceneRef.current, camera);

        // Add the renderer to the container
        containerRef.current.appendChild(renderer.domElement);

        setLoaded(true);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );
  };

  return (
    <div>
      <button onClick={loadModel}>Visualize</button>
      {loaded ? (
        <div ref={containerRef}></div>
      ) : (
        <p>Click the button above to load and visualize the 3D model</p>
      )}
      <div ref={sceneRef}></div>
    </div>
  );
}

export default VisualizeComponent;
