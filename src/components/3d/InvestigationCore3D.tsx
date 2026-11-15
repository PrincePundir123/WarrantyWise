"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InvestigationCore3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive assembly
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Core: Glowing Investigation Orb & Crystalline Rings
    const coreGeometry = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x3867e8,
      emissive: 0x1b2f4e,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Inner wireframe lattice
    const wireGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x50d9e8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // Outer orbital ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x50d9e8,
      emissive: 0x2557e0,
      roughness: 0.1,
      metalness: 0.9,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x3867e8,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // 2. Floating Dimensional Document Slabs (Purchase Invoice, Policy, Denial, Service Report)
    const docGeometry = new THREE.BoxGeometry(0.9, 1.25, 0.04);

    const createDocMesh = (color: number, x: number, y: number, z: number, rx: number, ry: number) => {
      const docMat = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.6,
        transparent: true,
        opacity: 0.88,
        reflectivity: 0.9,
        clearcoat: 1.0,
      });
      const mesh = new THREE.Mesh(docGeometry, docMat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, 0);
      group.add(mesh);
      return mesh;
    };

    const docInvoice = createDocMesh(0xffffff, -2.5, 0.8, -0.4, 0.2, 0.35); // Invoice
    const docPolicy = createDocMesh(0xeff6ff, 2.4, 1.0, -0.6, -0.15, -0.4); // Policy
    const docRejection = createDocMesh(0xfef2f2, -2.1, -1.2, 0.2, -0.2, 0.25); // Denial Notice
    const docService = createDocMesh(0xfffbeb, 2.3, -1.0, 0.3, 0.25, -0.3); // Service Report

    // Document Edge Connections (Evidence Lineage Rays)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x50d9e8,
      transparent: true,
      opacity: 0.45,
    });

    const createEvidenceRay = (targetDoc: THREE.Mesh) => {
      const points = [new THREE.Vector3(0, 0, 0), targetDoc.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMaterial);
      group.add(line);
      return line;
    };

    createEvidenceRay(docInvoice);
    createEvidenceRay(docPolicy);
    createEvidenceRay(docRejection);
    createEvidenceRay(docService);

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x50d9e8, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3867e8, 2.0);
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x3867e8, 3.5, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Mouse Parallax Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.4;
      targetY = -y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth parallax easing
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      group.rotation.y = mouseX;
      group.rotation.x = mouseY;

      // Subtle float oscillations
      coreMesh.rotation.y = elapsedTime * 0.35;
      wireMesh.rotation.y = -elapsedTime * 0.2;
      wireMesh.rotation.x = elapsedTime * 0.15;
      ringMesh.rotation.z = elapsedTime * 0.25;
      ringMesh2.rotation.z = -elapsedTime * 0.15;

      docInvoice.position.y = 0.8 + Math.sin(elapsedTime * 1.2) * 0.08;
      docPolicy.position.y = 1.0 + Math.cos(elapsedTime * 1.1) * 0.07;
      docRejection.position.y = -1.2 + Math.sin(elapsedTime * 1.3) * 0.08;
      docService.position.y = -1.0 + Math.cos(elapsedTime * 1.0) * 0.07;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      style={{ minHeight: "440px" }}
    />
  );
}

