import * as THREE from "three";
import orbit from "three-orbit-controls";

let orbitControls = orbit(THREE);

function getRandomColor() {
    let colors = [
      "dodgerblue",
      "tomato",
      "limegreen",
      "rebeccapurple",
      "gold",
      "lavender",
      "lightcoral",
      "papayawhip",
    ];
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

function createRendered() {
    let renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("white");
    renderer.setPixelRatio(window.devicePixelRatio);
    let output = document.querySelector("#output");
    output. appendChild(renderer.domElement);
    return renderer;
}

function createScene() {
    return new THREE.Scene();
}

function createCamera() {
    let camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(-30, 40, 30);
    camera.lookAt(0, 0, 0);
    return camera;
}

function createCube() {
    let geometry = new THREE.BoxGeometry(4, 4, 4);
    let material = new THREE.MeshLambertMaterial({color: getRandomColor()});
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
}

function createSphere() {
    let geo = new THREE.SphereGeometry(4, 30, 30)
    let mat = new THREE.MeshLambertMaterial({
        color: "tomato"
    })
    let mesh = new THREE.Mesh(geo, mat);
    return mesh
}

function createLight() {
    let light = new THREE.PointLight("white");
    return light;
}

let axesHelper = new THREE.AxesHelper( 50 );
let renderer = createRendered();
let scene = createScene();
let camera = createCamera();
let cube = createCube();
let sphere = createSphere();
let light = createLight();

new orbitControls(camera);

cube.position.x = 30;
sphere.position.x = 10;
light.position.set(5, 10, 10); // X, Y, Z

scene.add(axesHelper, light, cube, sphere);

let cubes = [];
let cubeCount = 1000;

for (let i = 1; i <= cubeCount; i += 1) {
    let newCube = createCube();
    newCube.position.x = Math.random() * 500 - 250;
    newCube.position.y = Math.random() * 500 - 250;
    newCube.position.z = Math.random() * 500 - 250;
    cubes.push(newCube);
}

scene.add(...cubes); // Spread Operator

function animate() {
    cubes.forEach(function(c){
        c.rotation.x += Math.random() / 10;
        c.rotation.y += Math.random() / 10;
        c.rotation.z += Math.random() / 10;
    })
    


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
