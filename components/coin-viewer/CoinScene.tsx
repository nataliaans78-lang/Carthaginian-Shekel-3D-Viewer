"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import styles from "./CoinExhibitViewer.module.css";
import MobileInfoPanel from "./MobileInfoPanel";
import {
  getResponsiveDistanceMultiplier,
  INITIAL_ROTATION,
  KEYBOARD_ROTATION_STEP,
  KEYBOARD_ZOOM_STEP,
  MODEL_URL,
  PRESETS,
  PRESET_BACKGROUNDS,
  type UiBorder,
} from "./constants";
import type { CopyShape, Language, PresetName } from "./copy";

type CoinSceneProps = {
  autoRotate: boolean;
  copy: CopyShape;
  displayPreset: PresetName;
  isMobileInfoOpen: boolean;
  isPresetTransitioning: boolean;
  lang: Language;
  nextPreset: PresetName | null;
  onLanguageChange: (language: Language) => void;
  preset: PresetName;
  resetSignal: number;
  ui: UiBorder;
};

const wrapAngle = (angle: number) =>
  THREE.MathUtils.euclideanModulo(angle + Math.PI, Math.PI * 2) - Math.PI;

const noiseFromUUID = (uuid: string) => {
  let hash = 0;
  for (let index = 0; index < uuid.length; index += 1) {
    hash = (hash * 31 + uuid.charCodeAt(index)) >>> 0;
  }
  const x = Math.sin(hash) * 43758.5453;
  return x - Math.floor(x);
};

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh;
}

function fitObjectToView(
  object: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls?: OrbitControlsImpl | null,
  viewportWidth?: number,
) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  object.position.set(-center.x, -center.y, -center.z);

  const fitHeightDistance =
    size.y / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
  const fitWidthDistance =
    size.x /
    (2 * camera.aspect * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));

  const width = viewportWidth ?? 1440;
  const distanceMultiplier = getResponsiveDistanceMultiplier(width);
  const mobileFillMultiplier = width < 900 ? 0.82 : 1;
  const distance =
    Math.max(fitHeightDistance, fitWidthDistance) * distanceMultiplier * mobileFillMultiplier;

  camera.position.set(0, -0.01 * size.y, distance);
  camera.near = 0.01;
  camera.far = distance * 20;
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target.set(0, 0, 0);
    controls.minDistance = distance * 0.82;
    controls.maxDistance = distance * 2.0;
    controls.update();
  }
}

function SoftRoomEnvironment({
  intensity,
  preset,
}: {
  intensity: number;
  preset: PresetName;
}) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const sceneRef = useRef(scene);

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();

    const blur = preset === "museum" ? 0.06 : 0.02;
    const envRT = pmrem.fromScene(new RoomEnvironment(), blur);
    const envMap = envRT.texture;
    const currentScene = sceneRef.current;

    currentScene.environment = envMap;

    return () => {
      if (currentScene.environment === envMap) {
        currentScene.environment = null;
      }
      envRT.dispose();
      pmrem.dispose();
    };
  }, [gl, preset]);

  useEffect(() => {
    const currentScene = sceneRef.current;

    currentScene.traverse((child) => {
      if (!("material" in child) || !child.material) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      for (const material of materials) {
        if (material instanceof THREE.MeshStandardMaterial) {
          material.envMapIntensity = intensity;
          material.needsUpdate = true;
        }
      }
    });
  }, [intensity]);

  return null;
}

function CoinModel({
  autoRotate,
  preset,
  resetSignal,
}: {
  autoRotate: boolean;
  preset: PresetName;
  resetSignal: number;
}) {
  const group = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const size = useThree((state) => state.size);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const targetRotation = useRef(new THREE.Euler(...INITIAL_ROTATION));
  const isFirstLoad = useRef(true);
  const isResetting = useRef(false);
  const autoRotateSpeed = useRef(0);

  const gltf = useGLTF(MODEL_URL, false, false, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  const cloned = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useEffect(() => {
    rendererRef.current = gl;
  }, [gl]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    renderer.toneMappingExposure = PRESETS[preset].exposure;
  }, [gl, preset]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (!isMesh(child) || !child.material) return;

      const setMaterialProps = (material: THREE.Material) => {
        if (!(material instanceof THREE.MeshStandardMaterial)) return;

        material.toneMapped = true;

        if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
        if (material.normalMap) material.normalMap.colorSpace = THREE.NoColorSpace;
        if (material.roughnessMap) material.roughnessMap.colorSpace = THREE.NoColorSpace;
        if (material.metalnessMap) material.metalnessMap.colorSpace = THREE.NoColorSpace;

        if (!material.userData.baseColor) {
          material.userData.baseColor = material.color.clone();
        }

        if (preset === "museum") {
          material.roughness = 0.84;
          material.metalness = 0.38;
        } else {
          material.roughness = 0.76;
          material.metalness = 0.32;
        }

        const noise = noiseFromUUID(material.uuid);
        material.roughness += noise * 0.06;
        material.metalness -= noise * 0.08;
        material.envMapIntensity = preset === "museum" ? 0.3 : 0.3;

        if (material.color && material.userData.baseColor) {
          material.color
            .copy(material.userData.baseColor)
            .multiplyScalar(preset === "museum" ? 0.86 : 0.9);
        }

        material.needsUpdate = true;
      };

      child.castShadow = true;
      child.receiveShadow = true;

      if (Array.isArray(child.material)) {
        child.material.forEach(setMaterialProps);
      } else {
        setMaterialProps(child.material);
      }
    });
  }, [cloned, preset]);

  useEffect(() => {
    if (!group.current) return;

    targetRotation.current.set(...INITIAL_ROTATION);
    autoRotateSpeed.current = 0;

    if (isFirstLoad.current) {
      group.current.rotation.set(...INITIAL_ROTATION);
      isResetting.current = false;
      isFirstLoad.current = false;
    } else {
      isResetting.current = true;
    }

    fitObjectToView(group.current, camera, controlsRef.current, size.width);
  }, [camera, cloned, resetSignal, size.width]);

  useFrame((_, delta) => {
    if (!group.current) return;

    if (isResetting.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotation.current.x,
        1 - Math.exp(-6 * delta),
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation.current.y,
        1 - Math.exp(-6 * delta),
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        targetRotation.current.z,
        1 - Math.exp(-6 * delta),
      );

      const done =
        Math.abs(group.current.rotation.x - targetRotation.current.x) < 0.001 &&
        Math.abs(group.current.rotation.y - targetRotation.current.y) < 0.001 &&
        Math.abs(group.current.rotation.z - targetRotation.current.z) < 0.001;

      if (done) {
        group.current.rotation.set(
          targetRotation.current.x,
          targetRotation.current.y,
          targetRotation.current.z,
        );
        isResetting.current = false;
      }

      return;
    }

    const targetSpeed = autoRotate ? 0.08 : 0;
    autoRotateSpeed.current = THREE.MathUtils.lerp(
      autoRotateSpeed.current,
      targetSpeed,
      1 - Math.exp(-5 * delta),
    );

    group.current.rotation.y = wrapAngle(
      group.current.rotation.y + delta * autoRotateSpeed.current,
    );
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      if (!group.current) return;

      const stopResetting = () => {
        isResetting.current = false;
        autoRotateSpeed.current = 0;
      };

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          stopResetting();
          group.current.rotation.x = wrapAngle(
            group.current.rotation.x - KEYBOARD_ROTATION_STEP.x,
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          stopResetting();
          group.current.rotation.x = wrapAngle(
            group.current.rotation.x + KEYBOARD_ROTATION_STEP.x,
          );
          break;
        case "ArrowLeft":
          event.preventDefault();
          stopResetting();
          group.current.rotation.y = wrapAngle(
            group.current.rotation.y - KEYBOARD_ROTATION_STEP.y,
          );
          break;
        case "ArrowRight":
          event.preventDefault();
          stopResetting();
          group.current.rotation.y = wrapAngle(
            group.current.rotation.y + KEYBOARD_ROTATION_STEP.y,
          );
          break;
        case "+":
        case "=":
        case "Add":
        case "NumpadAdd":
          event.preventDefault();
          stopResetting();
          controlsRef.current?.dollyOut?.(1 + KEYBOARD_ZOOM_STEP);
          controlsRef.current?.update?.();
          break;
        case "-":
        case "_":
        case "Subtract":
        case "NumpadSubtract":
          event.preventDefault();
          stopResetting();
          controlsRef.current?.dollyIn?.(1 + KEYBOARD_ZOOM_STEP);
          controlsRef.current?.update?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <group ref={group} rotation={INITIAL_ROTATION}>
        <primitive object={cloned} />
      </group>

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.75}
        zoomSpeed={0.9}
        panSpeed={0.7}
        screenSpacePanning={false}
      />
    </>
  );
}

function SceneLights({ preset }: { preset: PresetName }) {
  const isMuseum = preset === "museum";

  return (
    <>
      <ambientLight intensity={isMuseum ? 0.36 : 0.55} />
      <hemisphereLight
        intensity={isMuseum ? 0.42 : 0.4}
        groundColor="#0b0b0b"
        color={isMuseum ? "#ffe8c0" : "#f0f4ff"}
      />

      {isMuseum ? (
        <>
          <spotLight
            position={[1.5, 3.5, 2]}
            intensity={12}
            angle={Math.PI * 0.16}
            penumbra={0.75}
            decay={2}
            distance={24}
            color="#ffd4a0"
            castShadow
          />
          <directionalLight position={[-1, 1, 2]} intensity={0.22} />
          <directionalLight position={[-1, 2, -2]} intensity={0.12} />
          <directionalLight position={[1.2, 1.6, -2]} intensity={0.2} />
        </>
      ) : (
        <>
          <directionalLight position={[2, 3, 2]} intensity={2.5} />
          <directionalLight position={[-2, 2, 2]} intensity={1.2} />
          <directionalLight position={[0, 2, -2]} intensity={1.0} />
        </>
      )}
    </>
  );
}

function PresetLightOverlay({ preset }: { preset: PresetName }) {
  if (preset === "museum") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-[-8%] h-[54%] w-[46%] blur-[80px]"
          style={{
            left: "27%",
            background:
              "radial-gradient(circle at 50% 10%, rgba(255,226,170,0.12) 0%, rgba(255,226,170,0.04) 34%, rgba(255,255,255,0) 74%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[6%] h-[18%] w-[14%] blur-[34px]"
        style={{
          left: "51%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 45%, rgba(255,255,255,0) 100%)",
          borderRadius: "999px",
        }}
      />
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.04]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.15) 0.7px, transparent 0.7px), radial-gradient(rgba(0,0,0,0.10) 0.6px, transparent 0.6px)",
        backgroundSize: "7px 7px, 11px 11px",
        backgroundPosition: "0 0, 3px 4px",
      }}
    />
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur-md">
        Loading 3D model...
      </div>
    </Html>
  );
}

export default function CoinScene({
  autoRotate,
  copy,
  displayPreset,
  isMobileInfoOpen,
  isPresetTransitioning,
  lang,
  nextPreset,
  onLanguageChange,
  preset,
  resetSignal,
  ui,
}: CoinSceneProps) {
  const background = PRESET_BACKGROUNDS[displayPreset];
  const incomingBackground = nextPreset ? PRESET_BACKGROUNDS[nextPreset] : null;
  const presetSettings = PRESETS[preset];

  return (
    <div
      className={`${styles.coinCanvas} relative overflow-hidden rounded-[24px] border shadow-[0_20px_80px_rgba(0,0,0,0.45)] ${
        preset === "museum" ? "border-[#bfa06a]/18" : "border-[#8f96a1]/16"
      }`}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `${background.vignette}, ${background.overlay}` }}
      />

      {incomingBackground ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage: `${incomingBackground.vignette}, ${incomingBackground.overlay}`,
          }}
        />
      ) : null}

      <PresetLightOverlay preset={preset} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_58%,rgba(0,0,0,0.18)_100%)]" />
      <GrainOverlay />

      <motion.div
        initial={false}
        animate={{ opacity: isPresetTransitioning ? 0.22 : 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 z-10 bg-black"
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.04, 2.4], fov: 26 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ display: "block", height: "100%", width: "100%" }}
      >
        <color attach="background" args={[background.canvas]} />
        <SceneLights preset={preset} />

        <Suspense fallback={<Loader />}>
          <CoinModel autoRotate={autoRotate} preset={preset} resetSignal={resetSignal} />
          <SoftRoomEnvironment
            preset={preset}
            intensity={presetSettings.environmentIntensity}
          />
          <ContactShadows
            position={[0, -0.055, 0]}
            opacity={presetSettings.shadowOpacity}
            width={2.15}
            height={2.15}
            blur={presetSettings.shadowBlur}
            far={2.5}
            resolution={1024}
          />
        </Suspense>
      </Canvas>

      <MobileInfoPanel
        copy={copy}
        isOpen={isMobileInfoOpen}
        lang={lang}
        onLanguageChange={onLanguageChange}
        preset={preset}
        ui={ui}
      />

      <div
        className={`${styles.mobileCanvasLabel} pointer-events-none absolute bottom-3 left-3 z-20 rounded-2xl border px-3 py-2 backdrop-blur-md ${ui.soft} ${ui.bg}`}
      >
        <div className="text-[12px] font-medium leading-tight text-white">
          {copy.mobileModelName}
        </div>
        <div className="mt-0.5 text-[10px] text-white/60">{copy.mobileHint}</div>
      </div>

      <div
        className={`${styles.canvasOverlayLeft} pointer-events-none absolute bottom-4 left-4 max-w-[45%] rounded-2xl border px-2.5 py-2 backdrop-blur-md md:px-3.5 md:py-2.5 ${ui.soft} ${ui.bg}`}
      >
        <div className="text-[12px] font-medium leading-tight text-white md:text-[15px]">
          {copy.modelName}
        </div>
        <div className="mt-0.5 text-[11px] text-white/60 md:text-[13px]">{copy.hint}</div>
      </div>

      <div
        className={`${styles.canvasOverlayRight} pointer-events-none absolute bottom-4 right-4 max-w-[45%] rounded-full border px-2.5 py-1.5 text-[10px] text-white/75 backdrop-blur-md md:px-3.5 md:py-1.5 md:text-[12px] ${ui.soft} ${ui.bg}`}
      >
        {copy.controlsHint}
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
