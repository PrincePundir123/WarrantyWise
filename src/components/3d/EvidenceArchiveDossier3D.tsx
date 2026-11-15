"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EvidenceArchiveDossier3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Editorial camera angle looking slightly from top-right onto a desk
    camera.position.set(2.2, 3.2, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Warm Studio Lighting (Warm key light, cool soft ambient, directional rim)
    const ambientLight = new THREE.AmbientLight(0xf7f5f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.6);
    keyLight.position.set(4, 7, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdde3dc, 1.1);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    // 1. Desk Plane for contact shadows
    const deskGeo = new THREE.PlaneGeometry(16, 16);
    const deskMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.rotation.x = -Math.PI / 2;
    desk.position.y = -0.3;
    desk.receiveShadow = true;
    scene.add(desk);

    // 2. Physical Dossier Binder / Heavy Board Folio (Warm charcoal / deep olive tone)
    const binderGeo = new THREE.BoxGeometry(2.6, 0.08, 3.4);
    const binderMat = new THREE.MeshStandardMaterial({
      color: 0x2e352c, // Muted deep archival green
      roughness: 0.85,
      metalness: 0.05,
    });
    const binder = new THREE.Mesh(binderGeo, binderMat);
    binder.position.set(0, -0.22, 0);
    binder.castShadow = true;
    binder.receiveShadow = true;
    group.add(binder);

    // Embossed Brass Fastener Clip
    const clipGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xc4a362,
      roughness: 0.35,
      metalness: 0.85,
    });
    const clip = new THREE.Mesh(clipGeo, brassMat);
    clip.position.set(-1.0, -0.12, -1.35);
    clip.castShadow = true;
    group.add(clip);

    // 3. Realistic Document Layers inside the Dossier
    const createPaperSheet = (
      width: number,
      height: number,
      yPos: number,
      rotY: number,
      color: number,
      roughness: number = 0.95
    ) => {
      const geo = new THREE.BoxGeometry(width, 0.015, height);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness: 0.0,
      });
      const sheet = new THREE.Mesh(geo, mat);
      sheet.position.set(0, yPos, 0);
      sheet.rotation.y = rotY;
      sheet.castShadow = true;
      sheet.receiveShadow = true;
      group.add(sheet);
      return sheet;
    };

    // Sheet 1: Bottom base policy document
    const sheetPolicy = createPaperSheet(2.35, 3.1, -0.15, -0.04, 0xf6f3ed);

    // Sheet 2: Middle purchase invoice (slightly stepped out)
    const sheetInvoice = createPaperSheet(2.25, 3.0, -0.09, 0.035, 0xfcfbf9);
    sheetInvoice.position.x = 0.08;

    // Sheet 3: Manufacturer Rejection Notice (with Terracotta tint stamp)
    const sheetRejection = createPaperSheet(2.15, 2.85, -0.03, -0.02, 0xfdfbf7);
    sheetRejection.position.x = -0.05;

    // Sheet 4: Field Technician Report Sleeve (translucent archival sleeve)
    const sleeveGeo = new THREE.BoxGeometry(2.0, 0.01, 2.5);
    const sleeveMat = new THREE.MeshPhysicalMaterial({
      color: 0xf9f7f2,
      roughness: 0.2,
      transmission: 0.75,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.4,
    });
    const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeve.position.set(0.12, 0.05, 0.15);
    sleeve.rotation.y = 0.06;
    sleeve.castShadow = true;
    group.add(sleeve);

    // 4. Subtle Forensic Ribbon Marker (Muted terracotta ribbon)
    const ribbonGeo = new THREE.BoxGeometry(0.12, 0.008, 3.6);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xad593e,
      roughness: 0.7,
      metalness: 0.1,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.35, 0.08, 0.2);
    ribbon.rotation.y = -0.05;
    ribbon.castShadow = true;
    group.add(ribbon);

    // Mouse Interaction: Subtle camera panning and dossier elevation
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.25;
      targetY = -y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      group.rotation.y = -0.25 + currentX;
      group.rotation.x = currentY;

      // Gentle rhythmic breathing of the topmost document sleeve
      sleeve.position.y = 0.05 + Math.sin(elapsed * 1.2) * 0.008;
      ribbon.position.y = 0.08 + Math.sin(elapsed * 1.2) * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[460px] relative select-none cursor-grab active:cursor-grabbing"
    />
  );
}

