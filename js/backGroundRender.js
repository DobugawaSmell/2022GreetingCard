
// ページの読み込みを待つ
window.addEventListener('load', ThreeInit);
window.addEventListener("scroll", scroll);

//3D用変数
let OPACITY = 0.9;
let TRANS = true;
let DEPTH_TEST = false;

//カメライージング
let camX_easing = 0;
let camY_easing = -300;
let camZ_easing = 0;

//3D用変数
const radian = 1000;
let leftTime = 0;

function ThreeInit() {

    // サイズを指定
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
  
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#topCanvas'),
      antialias: true,
      alpha: true,  /// <= これ
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
  
    // シーンを作成
    const scene = new THREE.Scene();
  
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(camX_easing, camY_easing, camZ_easing);
    camera.rotation.set(0.8,0,0);

    // const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = 'tigerStatue.glb';

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(200.0, 200.0, 200.0);
            model.position.set(0, 0, 0);
            model.rotation.set(0,40,0);
            scene.add(model);

            // model["test"] = 100;
        },
        function (error) {
            console.log('An error happened');
            console.log(error);
        }
    );

    const light = new THREE.HemisphereLight(0xFFFFFF, 0x7F7F7F, 2.0);
    light.position.set(0,1000,0);
    scene.add(light);
    
    //背景色変更
    scene.background = new THREE.Color("#44966D");
  
    tick();
  
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      leftTime += 0.005;
      let posX = radian * Math.sin(leftTime);
      let posZ = radian * Math.cos(leftTime);

      camX_easing += (posX - camX_easing) * 0.1;
      camY_easing += (485 - camY_easing) * 0.1;
      camZ_easing += (posZ - camZ_easing) * 0.1;
        
        camera.position.x = camX_easing;
        camera.position.y = camY_easing;
        camera.position.z = camZ_easing;

      camera.lookAt(new THREE.Vector3(0,300,0));
      renderer.render(scene, camera); // レンダリング
  
      requestAnimationFrame(tick);
    }
  
  }