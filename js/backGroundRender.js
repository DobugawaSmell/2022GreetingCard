
// ページの読み込みを待つ
window.addEventListener('load', ThreeInit);
window.addEventListener("scroll", scroll);

//3D用変数
let OPACITY = 0.9;
let TRANS = true;
let DEPTH_TEST = false;

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
    camera.position.set(0, 215, radian);
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
            model.position.set(0, -300, 0);
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
        
        camera.position.x = posX;
        camera.position.y = 185;
        camera.position.z = posZ;
      camera.lookAt(new THREE.Vector3(0,0,0));
      renderer.render(scene, camera); // レンダリング
  
      requestAnimationFrame(tick);
    }
  
  }