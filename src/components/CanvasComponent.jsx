import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import './CanvasComponent.css'
import { AsciiRenderer, Environment, useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";

export default function CanvasComponent() {
    return (<div id="canv">
        <Canvas shadows camera={{
            position: [ 0.3, 2.111, -3.485 ],
            rotation: [Math.PI, 0, Math.PI],
            fov: 50,
            near: 0.01,
            far: 1000
        }} eventSource={ document.getElementById('root') } eventPrefix="client">
            <color attach="background" args={['black']}/>
            <pointLight 
                decay={0} position={[500, 500, 500]} intensity={3}
                castShadow
            />
            {/* <pointLight 
                decay={0} position={[-500, -500, -500]} intensity={3}
                castShadow
            /> */}
            <pointLight 
                decay={0} position={[-500, -500, -500]} intensity={1}
                castShadow
            />
            {/* <Environment preset="city" background blur={1} /> */}
            <ChessPiece src='/ChessVLM/pawn.glb' off={0} name="Pawn" rotation={[0.3, Math.PI / 1.6, 0]} position={[0.720, 2.485, 0]}/>
            <ChessPiece src='/ChessVLM/rook.glb' off={0} name="Rook" rotation={[0.3, Math.PI / 2, degToRad(-46.66)]} position={[2.204, 1.525, 0.069]}/>
            <ChessPiece src='/ChessVLM/king.glb' off={0} name="King" rotation={[0.3, Math.PI / 1.6, degToRad(-3.50)]} position={[-0.638, 1.818, 0]}/>
            
            <AsciiRenderer
                fgColor="white"
                // bgColor="transparent"
                bgColor="#101010"
                // characters="  .:-+*=%@#"
                characters=" .:-+*=%@#"
                invert
                renderIndex={1}
            />
        </Canvas>
    </div>)
}


function ChessPiece(props) {
    const ref = useRef();
    const { nodes, materials } = useGLTF( props.src );
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8);
        ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
    })
    materials[""].flatShading = true;
    return (
        <group ref={ ref }>
            <mesh receiveShadow castShadow 
                geometry={nodes[props.name].geometry} 
                material={materials[""]} 
                rotation={props.rotation}
                position={props.position}
                scale={[0.020, 0.020, 0.020]}
            />
        </group>
    )
}