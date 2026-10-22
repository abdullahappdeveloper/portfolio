import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { soundFx } from '../utils/audio';
import { Eye, RotateCcw, Sun, Compass, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface Hero3DCanvasProps {
  onInteract?: (objectName: string) => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ onInteract }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCameraView, setActiveCameraView] = useState<'iso' | 'close' | 'top'>('iso');
  const [lightingPreset, setLightingPreset] = useState<'nebula' | 'cyber' | 'dawn'>('nebula');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  // References for scene update handlers
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const islandGroupRef = useRef<THREE.Group | null>(null);
  const droneRef = useRef<THREE.Group | null>(null);
  const crystalsRef = useRef<THREE.Mesh[]>([]);
  const lightsRef = useRef<{
    keyLight?: THREE.DirectionalLight;
    hemiLight?: THREE.HemisphereLight;
    crystalLight?: THREE.PointLight;
  }>({});
  const wireframeMatsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Create Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07090e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Initial isometric view
    camera.position.set(7, 5.5, 9);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // 4. PMREM Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0x7c94b6, 0x181e28, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xa5c4ff, 2.2);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.camera.left = -5;
      keyLight.shadow.camera.right = 5;
      keyLight.shadow.camera.top = 5;
      keyLight.shadow.camera.bottom = -5;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 1.4);
    rimLight.position.set(-6, 3, -6);
    scene.add(rimLight);

    const crystalLight = new THREE.PointLight(0x06b6d4, 3.0, 8);
    crystalLight.position.set(-1.8, 1.2, 1.2);
    scene.add(crystalLight);

    lightsRef.current = { keyLight, hemiLight, crystalLight };

    // 6. Master Island Group
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);
    islandGroupRef.current = islandGroup;

    const materialsList: THREE.Material[] = [];

    // --- Floating Island Base ---
    // Floating underside rock: Inverted tapered cone with irregular faceted geometry
    const rockGeo = new THREE.ConeGeometry(3.6, 3.8, 8, 2, false);
    rockGeo.rotateX(Math.PI);
    // Displace vertices slightly for natural rock facets
    const posAttr = rockGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      const disp = Math.sin(posAttr.getX(i) * 2.5) * Math.cos(posAttr.getZ(i) * 2.5) * 0.22;
      posAttr.setY(i, y + disp);
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1f242e,
      roughness: 0.88,
      metalness: 0.1,
      flatShading: true,
    });
    materialsList.push(rockMat);

    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.y = -1.9;
    rockMesh.receiveShadow = !isSoftwareGl;
    islandGroup.add(rockMesh);

    // Island Top Grass / Moss Plate
    const turfGeo = new THREE.CylinderGeometry(3.65, 3.6, 0.45, 12);
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x15382b,
      roughness: 0.75,
      metalness: 0.05,
      flatShading: true,
    });
    materialsList.push(turfMat);

    const turfMesh = new THREE.Mesh(turfGeo, turfMat);
    turfMesh.position.y = 0.2;
    turfMesh.receiveShadow = !isSoftwareGl;
    islandGroup.add(turfMesh);

    // Upper terrace
    const upperTurfGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.35, 10);
    const upperTurfMesh = new THREE.Mesh(upperTurfGeo, turfMat);
    upperTurfMesh.position.set(-0.3, 0.55, -0.4);
    upperTurfMesh.receiveShadow = !isSoftwareGl;
    islandGroup.add(upperTurfMesh);

    // Stone Steps Pathway
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x3d4452,
      roughness: 0.8,
      metalness: 0.15,
      flatShading: true,
    });
    materialsList.push(stoneMat);

    for (let s = 0; s < 5; s++) {
      const stepGeo = new THREE.BoxGeometry(0.9 - s * 0.08, 0.1, 0.5);
      const stepMesh = new THREE.Mesh(stepGeo, stoneMat);
      stepMesh.position.set(0.7 + s * 0.25, 0.22 + s * 0.08, 1.2 - s * 0.35);
      stepMesh.rotation.y = -0.3;
      stepMesh.receiveShadow = !isSoftwareGl;
      islandGroup.add(stepMesh);
    }

    // --- Stylized Low-Poly Pine Trees ---
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x382216,
      roughness: 0.9,
      metalness: 0.05,
    });
    materialsList.push(woodMat);

    const pineMat = new THREE.MeshStandardMaterial({
      color: 0x0f4834,
      roughness: 0.7,
      metalness: 0.05,
      flatShading: true,
    });
    materialsList.push(pineMat);

    const createTree = (x: number, z: number, scale: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0.65, z);
      treeGroup.scale.setScalar(scale);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.1, 0.16, 0.7, 6);
      const trunk = new THREE.Mesh(trunkGeo, woodMat);
      trunk.position.y = 0.35;
      trunk.castShadow = !isSoftwareGl;
      treeGroup.add(trunk);

      // Foliage tiers
      const tiers = [
        { radius: 0.8, height: 0.8, y: 0.85 },
        { radius: 0.6, height: 0.7, y: 1.35 },
        { radius: 0.38, height: 0.6, y: 1.8 },
      ];
      tiers.forEach((tier) => {
        const foliageGeo = new THREE.ConeGeometry(tier.radius, tier.height, 6);
        const foliage = new THREE.Mesh(foliageGeo, pineMat);
        foliage.position.y = tier.y;
        foliage.castShadow = !isSoftwareGl;
        foliage.receiveShadow = !isSoftwareGl;
        treeGroup.add(foliage);
      });

      return treeGroup;
    };

    islandGroup.add(createTree(-1.5, -1.2, 1.15));
    islandGroup.add(createTree(-2.1, -0.6, 0.9));
    islandGroup.add(createTree(-1.2, -1.9, 0.75));
    islandGroup.add(createTree(1.9, -1.4, 0.85));

    // --- Glowing Magic Crystals ---
    const cyanCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: 0.9,
      flatShading: true,
    });
    materialsList.push(cyanCrystalMat);

    const purpleCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xd946ef,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.15,
      metalness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: 0.9,
      flatShading: true,
    });
    materialsList.push(purpleCrystalMat);

    const createdCrystals: THREE.Mesh[] = [];

    const createCrystalCluster = (x: number, y: number, z: number, isCyan: boolean) => {
      const clusterGroup = new THREE.Group();
      clusterGroup.position.set(x, y, z);

      const mat = isCyan ? cyanCrystalMat : purpleCrystalMat;
      const crystalConfigs = [
        { height: 1.1, radius: 0.18, rotX: 0.1, rotZ: -0.15, px: 0, pz: 0 },
        { height: 0.8, radius: 0.14, rotX: -0.2, rotZ: 0.25, px: 0.25, pz: 0.1 },
        { height: 0.65, radius: 0.12, rotX: 0.25, rotZ: 0.2, px: -0.2, pz: 0.18 },
        { height: 0.45, radius: 0.1, rotX: 0.05, rotZ: -0.3, px: 0.1, pz: -0.22 },
      ];

      crystalConfigs.forEach((cfg) => {
        // Double-ended cone / hexagonal prism
        const crystalGeo = new THREE.CylinderGeometry(0.01, cfg.radius, cfg.height, 6);
        const mesh = new THREE.Mesh(crystalGeo, mat);
        mesh.position.set(cfg.px, cfg.height * 0.45, cfg.pz);
        mesh.rotation.x = cfg.rotX;
        mesh.rotation.z = cfg.rotZ;
        mesh.castShadow = !isSoftwareGl;
        mesh.name = isCyan ? 'cyan-crystal' : 'purple-crystal';
        clusterGroup.add(mesh);
        createdCrystals.push(mesh);
      });

      return clusterGroup;
    };

    islandGroup.add(createCrystalCluster(-1.9, 0.4, 1.4, true));
    islandGroup.add(createCrystalCluster(1.4, 0.4, 1.8, false));
    islandGroup.add(createCrystalCluster(-2.2, 0.5, -1.8, false));
    crystalsRef.current = createdCrystals;

    // --- Hovering Companion Robot Drone ---
    const droneGroup = new THREE.Group();
    droneGroup.position.set(-2.8, 1.9, 0.2);
    droneRef.current = droneGroup;
    islandGroup.add(droneGroup);

    // Mini floating island pod underneath drone
    const dronePodGeo = new THREE.CylinderGeometry(0.55, 0.4, 0.3, 6);
    const dronePod = new THREE.Mesh(dronePodGeo, rockMat);
    dronePod.position.y = -0.7;
    droneGroup.add(dronePod);

    // Robot Chassis (white curved pod)
    const chassisGeo = new THREE.SphereGeometry(0.38, 16, 12);
    chassisGeo.scale(1, 0.85, 0.9);
    const droneWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.6,
    });
    materialsList.push(droneWhiteMat);

    const chassisMesh = new THREE.Mesh(chassisGeo, droneWhiteMat);
    chassisMesh.name = 'companion-drone';
    droneGroup.add(chassisMesh);

    // Robot Visor Eye (glowing cyan screen)
    const visorGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
    visorGeo.rotateX(Math.PI / 2);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.5,
      roughness: 0.1,
    });
    materialsList.push(visorMat);

    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.05, 0.32);
    droneGroup.add(visorMesh);

    // Dual Thrusters
    const thrusterGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.22, 8);
    const thrusterMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.2,
    });
    materialsList.push(thrusterMat);

    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.position.set(-0.42, -0.05, 0);
    droneGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.position.set(0.42, -0.05, 0);
    droneGroup.add(rightThruster);

    // --- Floating Satellite Asteroids / Rocks ---
    const satelliteGroup = new THREE.Group();
    islandGroup.add(satelliteGroup);

    const satRockGeo = new THREE.DodecahedronGeometry(0.24, 0);
    for (let r = 0; r < 7; r++) {
      const angle = (r / 7) * Math.PI * 2;
      const dist = 4.4 + (r % 3) * 0.45;
      const rock = new THREE.Mesh(satRockGeo, rockMat);
      rock.position.set(Math.cos(angle) * dist, Math.sin(r * 1.5) * 0.7 - 0.2, Math.sin(angle) * dist);
      rock.rotation.set(r * 0.4, r * 0.7, 0);
      rock.scale.setScalar(0.7 + (r % 3) * 0.3);
      satelliteGroup.add(rock);
    }

    // --- Ambient Particle Dust / Fireflies ---
    const particleCount = isSoftwareGl ? 60 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 14;
      particlePositions[p * 3 + 1] = Math.random() * 7 - 1.5;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 14;
      particleSpeeds[p] = 0.2 + Math.random() * 0.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle texture generated procedurally
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.8)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);

    const particleTex = new THREE.CanvasTexture(pCanvas);
    particleTex.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    materialsList.push(particleMat);

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    wireframeMatsRef.current = materialsList;

    // 7. Raycasting & Interaction Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const targetCamPos = new THREE.Vector3(7, 5.5, 9);
    const targetLookAt = new THREE.Vector3(0, 0.5, 0);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = x;
      mouse.y = y;

      // Parallax camera offset
      if (activeCameraView === 'iso') {
        targetCamPos.x = 7 + x * 0.9;
        targetCamPos.y = 5.5 + y * 0.6;
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(islandGroup.children, true);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.name === 'companion-drone') {
          soundFx.playWarp();
          if (droneRef.current) {
            droneRef.current.position.y += 0.45;
          }
          onInteract?.('AI Companion Drone');
        } else if (hit.name.includes('crystal')) {
          soundFx.playCrystal();
          onInteract?.('Resonance Crystals');
        } else {
          soundFx.playClick();
          onInteract?.('Unity Floating Island');
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // 8. Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, 3.5, delta);
      camera.lookAt(targetLookAt);

      // Auto-rotation of island
      if (autoRotate && islandGroupRef.current) {
        islandGroupRef.current.rotation.y += 0.22 * delta;
      }

      // Drone hover bobbing & antenna motion
      if (droneRef.current) {
        droneRef.current.position.y = 1.9 + Math.sin(elapsed * 2.5) * 0.12;
        droneRef.current.rotation.y = Math.sin(elapsed * 1.2) * 0.35;
      }

      // Satellite rocks slow counter-rotation
      satelliteGroup.rotation.y -= 0.12 * delta;

      // Pulse crystal emissive
      const pulse = 0.7 + Math.sin(elapsed * 3.0) * 0.3;
      cyanCrystalMat.emissiveIntensity = pulse;
      purpleCrystalMat.emissiveIntensity = 0.8 + Math.cos(elapsed * 2.7) * 0.3;

      // Animate particles rising
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount; p++) {
        pos[p * 3 + 1] += particleSpeeds[p] * delta;
        if (pos[p * 3 + 1] > 6) {
          pos[p * 3 + 1] = -1.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Raycast check for hover feedback
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(islandGroup.children, true);
      if (intersects.length > 0) {
        const top = intersects[0].object.name;
        if (top === 'companion-drone') {
          setHoveredObject('AI Companion Drone (Click to Ping)');
        } else if (top.includes('crystal')) {
          setHoveredObject('Shader Graph Mana Crystals (Click to Tune)');
        } else {
          setHoveredObject(null);
        }
      } else {
        setHoveredObject(null);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);

      // Clean disposal
      turfGeo.dispose();
      rockGeo.dispose();
      stoneMat.dispose();
      rockMat.dispose();
      turfMat.dispose();
      woodMat.dispose();
      pineMat.dispose();
      cyanCrystalMat.dispose();
      purpleCrystalMat.dispose();
      particleMat.dispose();
      particleGeo.dispose();
      particleTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Camera View Preset
  const applyCameraPreset = (view: 'iso' | 'close' | 'top') => {
    setActiveCameraView(view);
    soundFx.playClick();
    if (!cameraRef.current) return;
    if (view === 'iso') {
      cameraRef.current.position.set(7, 5.5, 9);
    } else if (view === 'close') {
      cameraRef.current.position.set(3.2, 2.8, 4.2);
    } else if (view === 'top') {
      cameraRef.current.position.set(0.1, 10.5, 3.5);
    }
  };

  // Update Lighting Preset
  const applyLightingPreset = (preset: 'nebula' | 'cyber' | 'dawn') => {
    setLightingPreset(preset);
    soundFx.playHover();
    const lights = lightsRef.current;
    if (!lights.keyLight || !lights.hemiLight || !lights.crystalLight) return;

    if (preset === 'nebula') {
      lights.keyLight.color.setHex(0xa5c4ff);
      lights.keyLight.intensity = 2.2;
      lights.hemiLight.color.setHex(0x7c94b6);
      lights.hemiLight.groundColor.setHex(0x181e28);
      lights.crystalLight.color.setHex(0x06b6d4);
    } else if (preset === 'cyber') {
      lights.keyLight.color.setHex(0x06b6d4);
      lights.keyLight.intensity = 2.8;
      lights.hemiLight.color.setHex(0xd946ef);
      lights.hemiLight.groundColor.setHex(0x0a0a1a);
      lights.crystalLight.color.setHex(0xf43f5e);
    } else if (preset === 'dawn') {
      lights.keyLight.color.setHex(0xfbbf24);
      lights.keyLight.intensity = 2.6;
      lights.hemiLight.color.setHex(0xfde68a);
      lights.hemiLight.groundColor.setHex(0x1f2937);
      lights.crystalLight.color.setHex(0x10b981);
    }
  };

  // Toggle Wireframe Developer Debug Mode
  const toggleWireframe = () => {
    soundFx.playClick();
    const nextState = !wireframeMode;
    setWireframeMode(nextState);
    wireframeMatsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = nextState;
      }
    });
  };

  return (
    <div className="relative w-full h-full select-none">
      {/* 3D WebGL Canvas Mounting Point */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Hover tooltip */}
      {hoveredObject && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono tracking-wide backdrop-blur-md pointer-events-none transition-all shadow-lg shadow-cyan-950/40">
          ✦ {hoveredObject}
        </div>
      )}

      {/* Three.js Skill Directive: Collapsible Ergonomic Bottom Control Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[760px] flex flex-col items-center">
        {/* Collapse / Expand Toggle Tab */}
        <button
          onClick={() => {
            soundFx.playClick();
            setIsHudCollapsed(!isHudCollapsed);
          }}
          className="mb-1.5 px-3 py-1 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-t-lg border-t border-x border-slate-700/60 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          {isHudCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>Show 3D Engine Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hide Engine Controls</span>
            </>
          )}
        </button>

        {/* Control Bar Panels */}
        {!isHudCollapsed && (
          <div className="w-full bg-[#0d121c]/90 border border-slate-700/70 rounded-xl p-2.5 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Camera View Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1 mr-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Cam:
              </span>
              <button
                onClick={() => applyCameraPreset('iso')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeCameraView === 'iso'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Isometric
              </button>
              <button
                onClick={() => applyCameraPreset('close')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeCameraView === 'close'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Close-up
              </button>
              <button
                onClick={() => applyCameraPreset('top')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  activeCameraView === 'top'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top-Down
              </button>
            </div>

            {/* Lighting Mood Switcher */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px] font-mono flex items-center gap-1 mr-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Light:
              </span>
              <button
                onClick={() => applyLightingPreset('nebula')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  lightingPreset === 'nebula'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Nebula
              </button>
              <button
                onClick={() => applyLightingPreset('cyber')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  lightingPreset === 'cyber'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cyber
              </button>
              <button
                onClick={() => applyLightingPreset('dawn')}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  lightingPreset === 'dawn'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dawn
              </button>
            </div>

            {/* Rotation & Wireframe Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setAutoRotate(!autoRotate);
                }}
                className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-colors ${
                  autoRotate
                    ? 'bg-slate-800 text-cyan-400 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
                title="Toggle Auto-Rotation"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline text-[11px]">Orbit</span>
              </button>

              <button
                onClick={toggleWireframe}
                className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-colors ${
                  wireframeMode
                    ? 'bg-purple-950/80 text-purple-300 border-purple-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title="Wireframe Debug Shader"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Wireframe</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
