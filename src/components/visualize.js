import React, { useState } from 'react';
import axios from 'axios';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function ThreeScene() {
  const [model, setModel] = useState(null);
  const [displayModel, setDisplayModel] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(null);
const [vtpFileUrl, setVtpFileUrl] = useState('');
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setModel(null);
    setDisplayModel(false);

    const newFormData = new FormData();
    newFormData.append('file', file);
    setFormData(newFormData);

    if (file.name.endsWith('.obj')) {
      const loader = new OBJLoader();
      loader.load(
        URL.createObjectURL(file),
        (obj) => {
          setModel(obj);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else if (file.name.endsWith('.stl')) {
      const loader = new STLLoader();
      loader.load(
        URL.createObjectURL(file),
        (geometry) => {
          const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const mesh = new THREE.Mesh(geometry, material);
          setModel(mesh);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
      const loader = new GLTFLoader();
      loader.load(
        URL.createObjectURL(file),
        (gltf) => {
          setModel(gltf.scene || gltf.scenes[0]);
        },
        undefined,
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Invalid file type');
    }
  };


  const handlePredictModel = async () => {
    setUploading(true);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const predictions = response.data.predictions;

      setMessage('Model predicted successfully');
      console.log('Predictions:', predictions);
    } catch (error) {
      console.error('Error predicting model:', error);
    }

    try {
      // Make a GET request to fetch the VTP file
      const response = await axios.get('http://localhost:8000/vtp-file', {
        responseType: 'blob', // Set the response type to 'blob' to handle binary data
      });
      const vtpFileBlob = new Blob([response.data]);
      const vtpFileUrl = URL.createObjectURL(vtpFileBlob);
      setVtpFileUrl(vtpFileUrl);
      // Create a URL object to generate a temporary download link
      //const url = URL.createObjectURL(new Blob([response.data]));



      console.log('VTP file URL:', vtpFileUrl);
    } catch (error) {
      console.error('Error fetching VTP file:', error);
    }

    setUploading(false);
  };

  const renderScene = (canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(light);
    scene.background = new THREE.Color(0xffffff);

    if (displayModel && model) {
      scene.add(model);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };

  const handleDisplayModel = () => {
    setDisplayModel(true);
  };

 const handleDownload = () => {
      if (vtpFileUrl) {
        const link = document.createElement('a');
        link.href = vtpFileUrl;
        link.download = 'output.vtp';
        link.click();
      }
    };

  return (
    <div>
      <form>
        <input type="file" accept=".obj,.stl,.glb,.gltf" onChange={handleFileUpload} />
        <button type="button" onClick={handleDisplayModel} disabled={!model}>
          Display Model
        </button>
        <button type="button" onClick={handlePredictModel} disabled={!model || uploading}>
          {uploading ? 'Predicting...' : 'Predict'}
        </button>
         <button type="button" onClick={handleDownload} disabled={!vtpFileUrl}>
          Download Output.vtp
        </button>
      </form>
      {message && <div>{message}</div>}
      <canvas
        id="canvas"
        ref={(canvas) => {
          if (canvas) {
            renderScene(canvas);
          }
        }}
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
}

export default ThreeScene;

