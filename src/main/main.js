import * as THREE from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

// 0、初始化化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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
scene.add(camera);



// 导入纹理
const textureLoader= new THREE.TextureLoader()
textureLoader.load()

// 4、添加物体

const cubeGeometry = new THREE.BoxGeometry(1,1,1) // 几何体
const basicMaterial = new THREE.MeshBasicMaterial({color: '#ffff00'}); // 材质

// 根据几何体、材质创建物体
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);













// 创建轨道控制器，围绕物体进行旋转
const controls = new OrbitControls(camera, renderer.domElement); // 将要被控制的相机，用于事件监听的HTML元素
// 设置控制器阻尼（惯性）让控制器带来重量感
controls.enableDamping = true;
// controls.dampingFactor=0.05 //惯性有多大

function render() {
  controls.update();
  renderer.render(scene, camera);
  // 渲染下一帧就会调用render函数
  requestAnimationFrame(render);
}
render();

// 添加坐标轴辅助器，模拟3个坐标轴的对象
const axesHelper = new THREE.AxesHelper(5); // 线段长度
scene.add(axesHelper);

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
// 屏幕双击
window.addEventListener("dblclick", () => {
  // 全屏
  const fullscreenElement = document.fullscreenElement;
  if (fullscreenElement) {
    document.exitFullscreen();
  } else {
    renderer.domElement.requestFullscreen();
  }
});
