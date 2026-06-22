"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0d2626, 2);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x14b8a6, 60, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x2dd4bf, 40, 20);
    pointLight2.position.set(-4, -2, 3);
    scene.add(pointLight2);
    const pointLight3 = new THREE.PointLight(0xe2f5f5, 20, 15);
    pointLight3.position.set(0, -5, 2);
    scene.add(pointLight3);

    // --- MAIN GEOMETRY GROUP ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerIco = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerIco);

    // Mid icosahedron (solid, glass-like)
    const midGeo = new THREE.IcosahedronGeometry(1.9, 2);
    const midMat = new THREE.MeshPhongMaterial({
      color: 0x071a1a,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.55,
      shininess: 120,
      specular: 0x2dd4bf,
    });
    const midIco = new THREE.Mesh(midGeo, midMat);
    mainGroup.add(midIco);

    // Inner core (bright, solid)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 3);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x0d3a3a,
      emissive: 0x14b8a6,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9,
      shininess: 200,
      specular: 0x7fe8e0,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Equatorial torus ring
    const ring1Geo = new THREE.TorusGeometry(2.8, 0.012, 6, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    mainGroup.add(ring1);

    // Tilted ring
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.008, 4, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // --- ORBITING SATELLITES ---
    const satelliteData = [
      { radius: 3.8, speed: 0.4, size: 0.12, color: 0x2dd4bf, yOffset: 0.8, phase: 0 },
      { radius: 4.3, speed: 0.28, size: 0.09, color: 0x14b8a6, yOffset: -0.5, phase: Math.PI / 2 },
      { radius: 3.5, speed: 0.55, size: 0.07, color: 0x7fe8e0, yOffset: 0.2, phase: Math.PI },
      { radius: 4.8, speed: 0.18, size: 0.14, color: 0x0c4a47, yOffset: -1.2, phase: Math.PI * 1.5 },
    ];

    const satellites = satelliteData.map((d) => {
      const geo = new THREE.OctahedronGeometry(d.size, 0);
      const mat = new THREE.MeshPhongMaterial({
        color: d.color,
        emissive: d.color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return { mesh, ...d, angle: d.phase };
    });

    // --- PARTICLES ---
    const PARTICLE_COUNT = 500;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4.5 + Math.random() * 4.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0x2dd4bf,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- CONNECTING LINES (inner web) ---
    const linePts: THREE.Vector3[] = [];
    for (let i = 0; i < 18; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.45;
      linePts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));
    }

    for (let i = 0; i < linePts.length; i++) {
      for (let j = i + 1; j < linePts.length; j++) {
        if (linePts[i].distanceTo(linePts[j]) < 2.8) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([linePts[i], linePts[j]]);
          const lineMesh = new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.12 })
          );
          mainGroup.add(lineMesh);
        }
      }
    }

    // --- MOUSE ---
    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- RESIZE ---
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // --- ANIMATION ---
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.004;

      // Main group rotation
      mainGroup.rotation.y += 0.003;
      mainGroup.rotation.x = Math.sin(frame * 0.5) * 0.08;

      // Counter-rotation of inner geo
      midIco.rotation.y -= 0.005;
      midIco.rotation.z += 0.003;
      core.rotation.y -= 0.01;
      core.rotation.x += 0.007;

      // Ring oscillation
      ring1.rotation.z += 0.004;
      ring2.rotation.y += 0.006;

      // Satellite orbits
      satellites.forEach((s) => {
        s.angle += s.speed * 0.01;
        s.mesh.position.x = Math.cos(s.angle) * s.radius;
        s.mesh.position.z = Math.sin(s.angle) * s.radius;
        s.mesh.position.y = s.yOffset + Math.sin(s.angle * 1.3) * 0.5;
        s.mesh.rotation.x += 0.02;
        s.mesh.rotation.y += 0.015;
      });

      // Particle slow spin
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      // Pulsing light
      pointLight1.intensity = 55 + Math.sin(frame * 2) * 8;
      pointLight2.intensity = 38 + Math.cos(frame * 1.5) * 6;

      // Camera parallax
      targetCamera.x += (mouse.x * 0.8 - targetCamera.x) * 0.04;
      targetCamera.y += (mouse.y * 0.5 - targetCamera.y) * 0.04;
      camera.position.x = targetCamera.x;
      camera.position.y = targetCamera.y;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
