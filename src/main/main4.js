import * as THREE from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

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
console.log("cube", cube,cubGeometry);
scene.add(cube);

//修改物体位置
// cube.position.set(5,0,0)
// cube.position.x = 5;
//缩放
// cube.scale.set(3, 2, 1);
cube.scale.x = 5;
// 旋转，Math.PI：180°
cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

//调试器
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x坐标")
  .onChange((value) => {
    console.log("改变事件", value);
  })
  .onFinishChange((value) => {
    console.log("改变后完全停下来", value);
  });
// 修改物体的颜色
const params = {
  color: "#ffff00",
  fn: () => {
    // 让立方体动起来
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
  },
};
gui.addColor(params, "color").onChange((value) => {
  console.log("addColor改变事件", value);
  cube.material.color.set(value);
});
// 设置选项框
gui.add(cube, "visible").name("是否显示");
// 设置文件夹
let folder = gui.addFolder("设置立方体");
// 跟上面的写法一样的
folder.add(cube.material, "wireframe").name("是否显示线框");
// 设置按钮点击触发某个事件
folder.add(params, "fn").name("跑起来");

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
