import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import './ChessBackdrop.css';

// Make sure you have these STL files in your assets directory
import pawnUrl from '../assets/pawn.stl';
import rookUrl from '../assets/rook.stl';
import kingUrl from '../assets/king.stl';

export default function ChessBackdrop() {
  const containerRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, effect;
    let pawn, rook, king;
    const material = new THREE.MeshPhongMaterial({ flatShading: true });

    function init() {
      // Camera setup
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.set(0.860, 1.111, -3.485);
      camera.rotation.x = Math.PI;
      camera.rotation.z = Math.PI;

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x101010);
      
      // Lights
      const pointLight1 = new THREE.PointLight(0xFFFFFF, 3, 0, 0);
      pointLight1.position.set(500, 500, 500);
      scene.add(pointLight1);
      
      const pointLight2 = new THREE.PointLight(0xFFFFFF, 3, 0, 0);
      pointLight2.position.set(-500, -500, -500);
      scene.add(pointLight2);

      // STL Loader
      const loader = new STLLoader();
      
      // Load pawn
      loader.load(
        pawnUrl, 
        function(geometry) {
          pawn = new THREE.Mesh(geometry, material);
          pawn.position.set(0.720, 0.785, 0);
          pawn.rotation.set(degToRad(-75.62), degToRad(-8.46), degToRad(-8.01));
          pawn.scale.set(0.02, 0.02, 0.02);
          pawn.castShadow = true;
          pawn.receiveShadow = true;
          geometry.center();
          scene.add(pawn);
        },
        undefined,
        function(error) {
          console.error(error);
        }
      );

      // Load rook
      loader.load(
        rookUrl,
        function(geometry) {
          rook = new THREE.Mesh(geometry, material);
          rook.position.set(1.604, 1.525, 0.069);
          rook.rotation.set(degToRad(-125.75), degToRad(-10.93), degToRad(-46.66));
          rook.scale.set(0.02, 0.02, 0.02);
          rook.castShadow = true;
          rook.receiveShadow = true;
          geometry.center();
          scene.add(rook);
        },
        undefined,
        function(error) {
          console.error(error);
        }
      );

      // Load king
      loader.load(
        kingUrl,
        function(geometry) {
          king = new THREE.Mesh(geometry, material);
          king.position.set(-0.138, 1.818, 0);
          king.rotation.set(degToRad(-72.47), degToRad(-22.59), degToRad(-3.49));
          king.scale.set(0.02, 0.02, 0.02);
          king.castShadow = true;
          king.receiveShadow = true;
          geometry.center();
          scene.add(king);
        },
        undefined,
        function(error) {
          console.error(error);
        }
      );

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // ASCII effect
      effect = new AsciiEffect(renderer, '.:-+*=%@#', { invert: true });
      effect.setSize(window.innerWidth, window.innerHeight);
      effect.domElement.style.color = 'white';
      effect.domElement.style.backgroundColor = '#101010';
      
      containerRef.current.appendChild(effect.domElement);
      
      // Handle window resize
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      effect.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      effect.render(scene, camera);
    }

    // Initialize and start animation
    init();
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      
      if (containerRef.current && effect.domElement) {
        containerRef.current.removeChild(effect.domElement);
      }
      
      // Dispose resources
      if (renderer) renderer.dispose();
      if (pawn) {
        pawn.geometry.dispose();
        pawn.material.dispose();
        scene.remove(pawn);
      }
      if (rook) {
        rook.geometry.dispose();
        rook.material.dispose();
        scene.remove(rook);
      }
      if (king) {
        king.geometry.dispose();
        king.material.dispose();
        scene.remove(king);
      }
    };
  }, []);

  return <div ref={containerRef} className="chess-backdrop"></div>;
}