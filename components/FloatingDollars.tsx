import React, { useEffect, useRef, useState } from "react";

// Define comprehensive types for Three.js objects
interface ThreeVector3 {
  set(arg0: number, arg1: number, arg2: number): unknown;
  x: number;
  y: number;
  z: number;
  add: (v: ThreeVector3) => void;
  multiplyScalar: (s: number) => void;
}

interface ThreeTexture {
  minFilter: number;
  magFilter: number;
}

interface ThreeMaterial {
  map: ThreeTexture | null;
  transparent: boolean;
  opacity: number;
  side: number;
}

interface ThreeGeometry {
  // Base geometry properties
  id: number;
  uuid: string;
  type: string;
  dispose: () => void;
}

interface ThreePlaneGeometry extends ThreeGeometry {
  parameters: {
    width: number;
    height: number;
    widthSegments: number;
    heightSegments: number;
  };
}

interface ThreeMesh {
  position: ThreeVector3;
  rotation: ThreeVector3;
  geometry: ThreePlaneGeometry;
  material: ThreeMaterial;
  userData: {
    velocity: ThreeVector3;
    rotationSpeed: ThreeVector3;
    swayOffset: number;
    depthFactor: number;
    originalZ: number;
  };
  castShadow: boolean;
  receiveShadow: boolean;
}

interface ThreeObject3D {
  position: ThreeVector3;
  castShadow?: boolean;
  shadow?: {
    mapSize: {
      width: number;
      height: number;
    };
  };
}

interface ThreeScene {
  add: (object: ThreeMesh | ThreeObject3D) => void;
  remove: (object: ThreeMesh) => void;
}

interface ThreeCamera {
  aspect: number;
  position: ThreeVector3;
  updateProjectionMatrix: () => void;
  lookAt: (x: number, y: number, z: number) => void;
}

interface ThreeRenderer {
  setSize: (width: number, height: number) => void;
  render: (scene: ThreeScene, camera: ThreeCamera) => void;
  domElement: HTMLCanvasElement;
  dispose: () => void;
  setClearColor: (color: number, alpha: number) => void;
  shadowMap: {
    enabled: boolean;
    type: number;
  };
}

interface ThreeConstants {
  Scene: new () => ThreeScene;
  PerspectiveCamera: new (
    fov: number,
    aspect: number,
    near: number,
    far: number
  ) => ThreeCamera;
  WebGLRenderer: new (options: {
    antialias: boolean;
    alpha: boolean;
  }) => ThreeRenderer;
  AmbientLight: new (color: number, intensity: number) => ThreeObject3D;
  DirectionalLight: new (color: number, intensity: number) => ThreeObject3D;
  PlaneGeometry: new (width: number, height: number) => ThreePlaneGeometry;
  MeshLambertMaterial: new (options: Partial<ThreeMaterial>) => ThreeMaterial;
  Mesh: new (
    geometry: ThreePlaneGeometry,
    material: ThreeMaterial
  ) => ThreeMesh;
  Vector3: new (x: number, y: number, z: number) => ThreeVector3;
  CanvasTexture: new (canvas: HTMLCanvasElement) => ThreeTexture;
  LinearFilter: number;
  PCFSoftShadowMap: number;
  DoubleSide: number;
}

interface FloatingDollarsProps {
  className?: string;
  initialDollarCount?: number;
  initialFallSpeed?: number;
  initialWindStrength?: number;
  showControls?: boolean;
}

const FloatingDollarsBackground: React.FC<FloatingDollarsProps> = ({
  className = "",
  initialDollarCount = 30,
  initialFallSpeed = 1,
  initialWindStrength = 0.5,
  showControls = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: ThreeScene;
    camera: ThreeCamera;
    renderer: ThreeRenderer;
  } | null>(null);
  const dollarsRef = useRef<ThreeMesh[]>([]);
  const animationIdRef = useRef<number | null>(null);
  const THREE = useRef<ThreeConstants | null>(null);

  const [dollarCount, setDollarCount] = useState<number>(initialDollarCount);
  const [fallSpeed, setFallSpeed] = useState<number>(initialFallSpeed);
  const [windStrength, setWindStrength] = useState<number>(initialWindStrength);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load Three.js dynamically
  useEffect(() => {
    const loadThreeJS = async () => {
      try {
        // Load Three.js from CDN
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.onload = () => {
          THREE.current = (
            window as unknown as { THREE: ThreeConstants }
          ).THREE;
          setIsLoaded(true);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to load Three.js:", error);
      }
    };

    loadThreeJS();

    return () => {
      // Cleanup script if component unmounts before loading
      const scripts = document.querySelectorAll('script[src*="three.min.js"]');
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Create detailed $100 bill texture
  const createDollarTexture = (): ThreeTexture | null => {
    if (!THREE.current) return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, "#85bb65");
    gradient.addColorStop(0.3, "#7ba85a");
    gradient.addColorStop(0.7, "#6b9b47");
    gradient.addColorStop(1, "#5a7f3a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);

    // Multiple decorative borders
    ctx.strokeStyle = "#2d5016";
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 496, 240);
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, 480, 224);
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 472, 216);

    // Corner designs
    ctx.fillStyle = "#2d5016";
    for (let corner = 0; corner < 4; corner++) {
      const x = corner % 2 ? 460 : 32;
      const y = corner < 2 ? 32 : 200;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (corner % 2 ? -20 : 20), y);
      ctx.lineTo(x + (corner % 2 ? -15 : 15), y + (corner < 2 ? 15 : -15));
      ctx.lineTo(x, y + (corner < 2 ? 20 : -20));
      ctx.closePath();
      ctx.fill();
    }

    // Franklin portrait
    ctx.beginPath();
    ctx.arc(160, 128, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#1a3d0a";
    ctx.fill();
    ctx.strokeStyle = "#2d5016";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Franklin silhouette
    ctx.fillStyle = "#0d2905";
    ctx.beginPath();
    ctx.ellipse(160, 115, 28, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair details
    ctx.beginPath();
    ctx.ellipse(145, 100, 15, 20, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(175, 100, 15, 20, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Collar
    ctx.fillRect(140, 145, 40, 15);

    // Text elements
    ctx.fillStyle = "#1a3d0a";
    ctx.font = "bold 12px serif";
    ctx.textAlign = "center";
    ctx.fillText("BENJAMIN FRANKLIN", 160, 190);

    // Large "100"
    ctx.fillStyle = "#2d5016";
    ctx.font = "bold 76px serif";
    ctx.fillText("100", 382, 142);
    ctx.fillStyle = "#1a3d0a";
    ctx.fillText("100", 380, 140);

    // Corner "100"s
    ctx.font = "bold 28px serif";
    ctx.textAlign = "left";
    ctx.fillText("100", 30, 55);
    ctx.textAlign = "right";
    ctx.fillText("100", 482, 205);

    // Header text
    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.fillText("THE UNITED STATES", 350, 45);
    ctx.fillText("OF AMERICA", 350, 65);

    ctx.font = "bold 14px serif";
    ctx.fillText("ONE HUNDRED DOLLARS", 350, 195);

    // Federal Reserve text
    ctx.font = "bold 18px serif";
    ctx.textAlign = "left";
    ctx.fillText("FEDERAL RESERVE NOTE", 30, 85);

    // Serial number
    ctx.font = "bold 12px monospace";
    ctx.fillText("KB 46279877 B7", 30, 210);

    // Treasury seal
    ctx.beginPath();
    ctx.arc(80, 75, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#1a3d0a";
    ctx.fill();
    ctx.strokeStyle = "#2d5016";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Seal text
    ctx.fillStyle = "#0d2905";
    ctx.font = "bold 8px serif";
    ctx.textAlign = "center";
    ctx.fillText("TREAS", 80, 75);

    // Fed seal
    ctx.beginPath();
    ctx.arc(400, 75, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#1a3d0a";
    ctx.fill();
    ctx.strokeStyle = "#2d5016";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Microprinting
    ctx.fillStyle = "#2d5016";
    ctx.font = "6px serif";
    for (let i = 0; i < 20; i++) {
      ctx.fillText("USA", 250 + i * 8, 230);
    }

    const texture = new THREE.current.CanvasTexture(canvas);
    texture.minFilter = THREE.current.LinearFilter;
    texture.magFilter = THREE.current.LinearFilter;

    return texture;
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!isLoaded || !THREE.current || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.current.Scene();
    const camera = new THREE.current.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.current.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.current.PCFSoftShadowMap;

    // Style the canvas for overlay
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "-1";

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.current.AmbientLight(0x404040, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.current.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(15, 15, 10);
    directionalLight.castShadow = true;
    if (directionalLight.shadow) {
      directionalLight.shadow.mapSize.width = 2048;
    }
    scene.add(directionalLight);

    const fillLight = new THREE.current.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-10, 5, 5);
    scene.add(fillLight);

    sceneRef.current = { scene, camera, renderer };

    // Create dollar material
    const dollarGeometry = new THREE.current.PlaneGeometry(2.4, 1.2);
    const dollarTexture = createDollarTexture();
    const dollarMaterial = new THREE.current.MeshLambertMaterial({
      map: dollarTexture,
      transparent: true,
      opacity: 0.85, // Slightly more transparent for overlay effect
      side: THREE.current.DoubleSide,
    });

    // Initialize dollars
    const initializeDollars = () => {
      dollarsRef.current.forEach((dollar) => scene.remove(dollar));
      dollarsRef.current = [];

      if (!THREE.current) return;
      for (let i = 0; i < dollarCount; i++) {
        const dollar = new THREE.current.Mesh(dollarGeometry, dollarMaterial);

        dollar.position.x = (Math.random() - 0.5) * 25;
        dollar.position.y = 20 + Math.random() * 10 + i * 1.5;
        dollar.position.z = (Math.random() - 0.5) * 25;

        dollar.rotation.x = Math.random() * Math.PI;
        dollar.rotation.y = Math.random() * Math.PI;
        dollar.rotation.z = Math.random() * Math.PI;

        const depthFactor = (dollar.position.z + 12.5) / 25;
        dollar.userData = {
          velocity: new THREE.current.Vector3(
            (Math.random() - 0.5) * 0.03,
            -Math.random() * 0.025 - 0.015,
            (Math.random() - 0.5) * 0.02
          ),
          rotationSpeed: new THREE.current.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.02
          ),
          swayOffset: Math.random() * Math.PI * 2,
          depthFactor: depthFactor,
          originalZ: dollar.position.z,
        };

        dollar.castShadow = true;
        dollar.receiveShadow = true;

        dollarsRef.current.push(dollar);
        scene.add(dollar);
      }
    };

    initializeDollars();
    camera.position.set(0, 2, 15);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      dollarsRef.current.forEach((dollar, index) => {
        const parallaxSpeed = dollar.userData.depthFactor * 0.5 + 0.5;

        // Physics
        dollar.userData.velocity.y -= 0.0008 * fallSpeed * parallaxSpeed;

        const sway =
          Math.sin(time * 2.5 + dollar.userData.swayOffset) *
          windStrength *
          0.015;
        const depthSway =
          Math.cos(time * 1.8 + dollar.userData.swayOffset * 0.7) *
          windStrength *
          0.01;
        dollar.userData.velocity.x += sway * parallaxSpeed;
        dollar.userData.velocity.z += depthSway * parallaxSpeed;

        // Apply movement
        dollar.position.x += dollar.userData.velocity.x * parallaxSpeed;
        dollar.position.y += dollar.userData.velocity.y * parallaxSpeed;
        dollar.position.z += dollar.userData.velocity.z * parallaxSpeed;

        // Rotation
        dollar.rotation.x += dollar.userData.rotationSpeed.x * parallaxSpeed;
        dollar.rotation.y += dollar.userData.rotationSpeed.y * parallaxSpeed;
        dollar.rotation.z += dollar.userData.rotationSpeed.z * parallaxSpeed;

        // Floating motion
        dollar.position.y +=
          Math.sin(time * 3.5 + index) * 0.008 * parallaxSpeed;
        dollar.position.x +=
          Math.cos(time * 2.2 + index * 0.5) * 0.004 * parallaxSpeed;

        // Reset when off screen
        if (dollar.position.y < -20) {
          dollar.position.y = 20 + Math.random() * 10;
          dollar.position.x = (Math.random() - 0.5) * 25;
          dollar.position.z = (Math.random() - 0.5) * 25;
          dollar.userData.depthFactor = (dollar.position.z + 12.5) / 25;
          dollar.userData.velocity.y = -Math.random() * 0.025 - 0.015;
          dollar.userData.velocity.x = (Math.random() - 0.5) * 0.03;
          dollar.userData.velocity.z = (Math.random() - 0.5) * 0.02;
        }

        // Boundaries
        if (Math.abs(dollar.position.x) > 15) {
          dollar.userData.velocity.x *= -0.7;
        }
        if (Math.abs(dollar.position.z) > 15) {
          dollar.userData.velocity.z *= -0.7;
        }

        // Drag
        dollar.userData.velocity.multiplyScalar(0.997);
      });

      // Camera parallax
      camera.position.x = Math.sin(time * 0.4) * 2;
      camera.position.y = 2 + Math.cos(time * 0.3) * 1.5;
      camera.position.z = 15 + Math.sin(time * 0.25) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;

      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && sceneRef.current) {
        mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        sceneRef.current.renderer.dispose();
      }
    };
  }, [isLoaded, dollarCount, fallSpeed, windStrength]);

  const addBurst = () => {
    if (!sceneRef.current || !THREE.current) return;

    const { scene } = sceneRef.current;
    const dollarGeometry = new THREE.current.PlaneGeometry(2.4, 1.2);
    const dollarTexture = createDollarTexture();
    const dollarMaterial = new THREE.current.MeshLambertMaterial({
      map: dollarTexture,
      transparent: true,
      opacity: 0.85,
      side: THREE.current.DoubleSide,
    });

    for (let i = 0; i < 25; i++) {
      const dollar = new THREE.current.Mesh(dollarGeometry, dollarMaterial);
      dollar.position.x = (Math.random() - 0.5) * 12;
      dollar.position.y = 15;
      dollar.position.z = (Math.random() - 0.5) * 20;

      const depthFactor = (dollar.position.z + 10) / 20;
      dollar.userData = {
        velocity: new THREE.current.Vector3(
          (Math.random() - 0.5) * 0.12,
          -0.08 - Math.random() * 0.05,
          (Math.random() - 0.5) * 0.08
        ),
        rotationSpeed: new THREE.current.Vector3(
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.04
        ),
        swayOffset: Math.random() * Math.PI * 2,
        depthFactor: depthFactor,
        originalZ: dollar.position.z,
      };

      dollar.castShadow = true;
      dollar.receiveShadow = true;

      dollarsRef.current.push(dollar);
      scene.add(dollar);
    }
  };

  if (!isLoaded) {
    return (
      <div className={`fixed inset-0 pointer-events-none ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading 3D dollars...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Optional Controls Panel */}
      {showControls && (
        <div className="absolute top-6 left-6 bg-black bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-white z-10 pointer-events-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium min-w-[100px]">
                Dollar Count:
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={dollarCount}
                onChange={(e) => setDollarCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm min-w-[30px]">{dollarCount}</span>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium min-w-[100px]">
                Fall Speed:
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={fallSpeed}
                onChange={(e) => setFallSpeed(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm min-w-[30px]">
                {fallSpeed.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-medium min-w-[100px]">
                Wind Effect:
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={windStrength}
                onChange={(e) => setWindStrength(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm min-w-[30px]">
                {windStrength.toFixed(1)}
              </span>
            </div>

            <button
              onClick={addBurst}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Money Burst! 💰
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingDollarsBackground;
