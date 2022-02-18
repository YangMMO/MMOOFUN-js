import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';


let camera, scene, renderer;

init();
render();

function init() {

    const container = document.createElement( 'div' );
    container.classList.add("canvas-frame");
    document.body.appendChild( container );

    // console.log(container)

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( - 1.8, 0.6, 2.7 );

    scene = new THREE.Scene();

    new RGBELoader()
      .setPath( './obj/' )
      .load( 'royal_esplanade_1k.hdr', function ( texture ) {

         texture.mapping = THREE.EquirectangularReflectionMapping;

         //scene.background = texture;
         scene.background =  new THREE.Color( 0xffffff );
         scene.environment = texture;

         render();

         // model

         const loader = new GLTFLoader().setPath( './obj/' );
         loader.load( 'monkey.gltf', function ( gltf ) {

            scene.add( gltf.scene );

            render();

         } );

      } );

   renderer = new THREE.WebGLRenderer( { antialias: true } );
   renderer.setPixelRatio( window.devicePixelRatio );
   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.toneMapping = THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure = 1;
   renderer.outputEncoding = THREE.sRGBEncoding;
   container.appendChild( renderer.domElement );

   const controls = new OrbitControls( camera, renderer.domElement );
   controls.addEventListener( 'change', render ); // use if there is no animation loop
   controls.minDistance = 10;
   controls.maxDistance = 10;
   // controls.maxAzimuthAngle = 0;
   // controls.minAzimuthAngle = 0;
   controls.target.set( 0, 0, 0 );
   controls.update();

   window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );

   render();

}

//

function render() {

   renderer.render( scene, camera );

}

