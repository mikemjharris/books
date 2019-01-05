console.log('Setup');
import React from 'react';
import * as THREE from 'three';

//import AppController from './components/app.js'
//new AppController();

//import './main.scss'
//
window.three = THREE;
window.scene = new THREE.Scene();
window.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 0.2, 4, 5 );
var material = new THREE.MeshBasicMaterial( { color: 0x55ff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 0.5;
var face = cube.clone();
face.position.x = -0.5;
scene.add( cube );
scene.add( face );

var geometryPaper = new THREE.BoxGeometry( 1, 3.8, 4.8);
var materialPaper = new THREE.MeshBasicMaterial( { color: 0xffffff } );
window.paper = new THREE.Mesh( geometryPaper, materialPaper );
paper.position.y = -0.1;
scene.add( paper );

window.geometryCylinder = new THREE.CylinderGeometry( 1, 1, 5, 32, 10, true, - Math.PI/5 , Math.PI/2.5 );
var materialSpine= new THREE.MeshBasicMaterial( { color: 0x55ff00, side: THREE.DoubleSide} );
window.spine = new THREE.Mesh( geometryCylinder , materialSpine);
spine.rotation.x = Math.PI / 2;
spine.position.y = -1.2;
scene.add( spine );
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = -2;
camera.rotation.y = 0.5;

var x = 0;
var animate = function () {
  requestAnimationFrame( animate );
    camera.rotation.z += 0.01;
  renderer.render( scene, camera );

};

animate();

