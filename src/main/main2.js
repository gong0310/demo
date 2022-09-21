import * as THREE from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 0、初始化化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
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
// 3、相机添加到场景当中
scene.add(camera);
// 4、添加物体
// 创建几何体
const cubGeometry = new THREE.BoxGeometry(1, 1, 1); // 宽高深度为1的几何体
// 几何体的材质
const cubMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体、材质创建物体
const cube = new THREE.Mesh(cubGeometry, cubMaterial);
console.log("cube", cube);
scene.add(cube);

//修改物体位置
// cube.position.set(5,0,0)
// cube.position.x = 5;
//缩放
// cube.scale.set(3, 2, 1);
cube.scale.x = 5;
// 旋转，Math.PI：180°
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

// 创建轨道控制器，围绕物体进行旋转
const controls = new OrbitControls(camera, renderer.domElement); // 将要被控制的相机，用于事件监听的HTML元素

// 设置时钟
const clock = new THREE.Clock();
function render() {
  // console.log(time)
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }

  // let t = (time / 1000) % 5;
  // cube.position.x = t * 1;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }

  // 获取时钟运行的总时长
  let time = clock.getElapsedTime();
  let deltaTime = clock.getDelta();

  console.log("钟运行的总时长", time);
  console.log("两次获取时间的间隔时间", deltaTime);
  let t = time % 5;
  cube.position.x = t * 1;

  renderer.render(scene, camera);
  // 渲染下一帧就会调用render函数
  requestAnimationFrame(render);
}
render();

// 添加坐标轴辅助器，模拟3个坐标轴的对象
const axesHelper = new THREE.AxesHelper(5); // 线段长度
scene.add(axesHelper);
