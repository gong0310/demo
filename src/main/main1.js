import * as THREE from "three";

console.log(THREE);
// 0、初始化化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);
// 将webgl渲染的canvas内容添加到boay上
document.body.appendChild(renderer.domElement);

// 1、创建场景
const scene = new THREE.Scene();
// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // 透视相机

// 设置相机位置
camera.position.set(0, 0, 10); //x y z
// 3、相机添加到场景当中
scene.add(camera);

// 创建几何体
const cubGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽高深度为1的几何体
// 几何体的材质
const cubMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 4、根据几何体、材质创建物体
const cube = new THREE.Mesh(cubGeometry, cubMaterial);
// 5、添加物体
scene.add(cube);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene,camera)