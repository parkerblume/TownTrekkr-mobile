import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import React, {useState} from 'react';
import * as THREE from "three";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
} from 'three';
import {loadModel} from '../../utils/3d';

// const modelGLB = {
//   earth: {
//     type: 'gltf',
//     name: 'earth',
//     model: require('../assets/3dEarth/earth/scene.gltf'),
//     textures: [
//       {
//         name: "Nuages",
//         image: require('../assets/3dEarth/earth/textures/NUAGES_baseColor.png')
//       },
//       {
//         name: "TERRE_base",
//         image: require('../assets/3dEarth/earth/textures/TERRE_baseColor.jpeg')
//       },
//       {
//         name: "TERRE_emis",
//         image: require('../assets/3dEarth/earth/textures/TERRE_emissive.jpeg')
//       },
//       {
//         name: "TERRE_meta",
//         image: require('../assets/3dEarth/earth/textures/TERRE_metallicRoughness.png')
//       }
//     ],
//     scale: {
//       x: 1,
//       y: 1,
//       z: 1,
//     },
//     position: {
//       x: 0,
//       y: 0,
//       z: -2,
//     },
//     animation: {
//       rotation: {
//         y: 0.01, // to animate horizontally
//         x: 0.003, // to animate vertically
//       },
//     },
//   },
// };

const modelFBX = {
  polyEarth: {
    type: 'fbx',
    name: 'polyEarth',
    isometric: false,
    model: require('../../assets/3dEarth/polyEarth.fbx'),
    textures: [],
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    position: {
      x: 0,
      y: 0,
      z: -2,
    },
    animation: {
      rotation: {
        x: 0.001,
        y: 0.0008, // to animate horizontally
        z: 0.0005
      },
    },
  },
}

const onContextCreate = async (gl, data) => {

  // Get the selected data, and create our renderer
  const {selected} = data;
  const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;
  const renderer = new Renderer({gl});
  renderer.setSize(width, height);

  // Create our camera
  let camera = new PerspectiveCamera(75, width / height, 0.1, 500);
  camera.position.set(0,0,175);

  // Set up our scene and lights.
  const scene = new Scene();
  // const pointLight = new PointLight(0xffffff, 5, 2000, 100);
  // pointLight.position.set(0, 30, 100);
  // scene.add(pointLight);

  const hemisphereLight = new HemisphereLight(0xffffff, 0x404040, 0.5); // White light with a soft white ambient
  scene.add(hemisphereLight);

  // Add a directional light for sunlight
  const directionalLight = new DirectionalLight(0x404040, 1);
  directionalLight.position.set(10, 10, 40); // Position the light diagonally
  directionalLight.castShadow = true; // Enable shadow casting
  scene.add(directionalLight);
  //scene.add(directionalLight.target);

  // Set up shadow properties for the directional light
  directionalLight.shadow.mapSize.width = width;
  directionalLight.shadow.mapSize.height = height;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.lreft = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;

  // load our model.
  const model = await loadModel(selected);
  scene.add(model);

  //directionalLight.target = model;

  function update() {
    if (model && selected?.animation) {
      if (selected.animation?.rotation?.x) {
        model.rotation.x += selected.animation?.rotation?.x;
        model.rotation.x %= Math.PI * 2;
      }
      if (selected.animation?.rotation?.y) {
        model.rotation.y += selected.animation?.rotation?.y;
        model.rotation.y %= Math.PI * 2;
      }
      if (selected.animation?.rotation?.z) {
        model.rotation.z += selected.animation?.rotation?.z;
        model.rotation.z %= Math.PI * 2;
      }
    }
  }

  // Setup an animation loop
  const render = () => {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

const SpinningEarth = props => {
    const model = modelFBX.polyEarth;
    const [selected, setSelected] = useState(model);
    const [gl, setGL] = useState(null);
  
    return (
      <>
        {selected ? (
          <GLView style={{ flex: 1 }} 
                  onContextCreate={gl => {
                    setGL(gl);
                    onContextCreate(gl, {selected});
                  }} 

          />
        ) : (
          <View><Text>Loading...</Text></View>
        )}
      </>
    );
};
  
export default SpinningEarth;