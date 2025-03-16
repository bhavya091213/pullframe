import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  uniform vec3 uOffset;
  uniform float uTime;
  uniform float uDistortionFrequency;
  uniform float uDistortionStrength;
  uniform float uDisplacementFrequency;
  uniform float uDisplacementStrength;
  
  void main() {
    vec3 pos = position;
    
    // Apply distortion and displacement for organic noise
    float distortion = sin(pos.x * uDistortionFrequency + uTime) * 
                       sin(pos.y * uDistortionFrequency + uTime) * 
                       sin(pos.z * uDistortionFrequency + uTime) * 
                       uDistortionStrength;
    
    float displacement = sin(pos.x * uDisplacementFrequency + uTime) * 
                         sin(pos.y * uDisplacementFrequency + uTime) * 
                         sin(pos.z * uDisplacementFrequency + uTime) * 
                         uDisplacementStrength;
    
    pos += normal * displacement;
    pos += uOffset;
    
    vNormal = normalMatrix * normal;
    vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uLightAColor;
  uniform vec3 uLightAPosition;
  uniform float uLightAIntensity;
  
  uniform vec3 uLightBColor;
  uniform vec3 uLightBPosition;
  uniform float uLightBIntensity;

  // New uniforms for our sphere's gradient colors
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorTertiary;
  
  uniform float uFresnelOffset;
  uniform float uFresnelMultiplier;
  uniform float uFresnelPower;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 normal = normalize(vNormal);
    
    // Use the vertical component of the normal to blend between primary and secondary colors
    float mixFactor = (normal.y + 1.0) / 2.0;
    vec3 baseColor = mix(uColorPrimary, uColorSecondary, mixFactor);
    
    // Add a tertiary color influence using a Fresnel effect for a dynamic highlight
    float fresnel = uFresnelMultiplier * pow(1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0), uFresnelPower);
    baseColor = mix(baseColor, uColorTertiary, clamp(fresnel, 0.0, 1.0));
    
    // Compute lighting contributions from two lights
    vec3 lightDirA = normalize(uLightAPosition - vPosition);
    float diffuseA = max(dot(normal, lightDirA), 0.0);
    vec3 colorA = uLightAColor * diffuseA * uLightAIntensity;
    
    vec3 lightDirB = normalize(uLightBPosition - vPosition);
    float diffuseB = max(dot(normal, lightDirB), 0.0);
    vec3 colorB = uLightBColor * diffuseB * uLightBIntensity;
    
    // Combine the base gradient with lighting
    vec3 finalColor = baseColor + colorA + colorB;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const Sphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Define lights using your provided primary and secondary colors
  const lights = useMemo(
    () => ({
      a: {
        intensity: 1.85,
        // Primary color: #D52941
        color: { value: "#D52941", instance: new THREE.Color("#D52941") },
        spherical: new THREE.Spherical(1, 0.615, 2.049),
      },
      b: {
        intensity: 1.4,
        // Secondary color: #990D35
        color: { value: "#990D35", instance: new THREE.Color("#990D35") },
        spherical: new THREE.Spherical(1, 2.561, -1.844),
      },
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 512, 512);
    geo.computeTangents();
    return geo;
  }, []);

  const material = useMemo(() => {
    const uniforms = {
      uLightAColor: { value: lights.a.color.instance },
      uLightAPosition: {
        value: new THREE.Vector3().setFromSpherical(lights.a.spherical),
      },
      uLightAIntensity: { value: lights.a.intensity },

      uLightBColor: { value: lights.b.color.instance },
      uLightBPosition: {
        value: new THREE.Vector3().setFromSpherical(lights.b.spherical),
      },
      uLightBIntensity: { value: lights.b.intensity },

      uSubdivision: {
        value: new THREE.Vector2(
          geometry.parameters.widthSegments,
          geometry.parameters.heightSegments
        ),
      },
      uOffset: { value: new THREE.Vector3() },

      uDistortionFrequency: { value: 1.5 },
      uDistortionStrength: { value: 1.0 },
      uDisplacementFrequency: { value: 2.12 },
      uDisplacementStrength: { value: 0.3 },

      uFresnelOffset: { value: -1.609 },
      uFresnelMultiplier: { value: 3.587 },
      uFresnelPower: { value: 1.793 },

      uTime: { value: 0 },

      // New uniforms for the sphere's gradient colors
      uColorPrimary: { value: new THREE.Color("#D52941") }, // primary
      uColorSecondary: { value: new THREE.Color("#990D35") }, // secondary
      uColorTertiary: { value: new THREE.Color("#FCD581") }, // tertiary
    };

    return new THREE.ShaderMaterial({
      uniforms,
      defines: { USE_TANGENT: "" },
      vertexShader,
      fragmentShader,
    });
  }, [geometry, lights]);

  // GSAP animations for dynamic uniforms (distortion, displacement, offset, etc.)
  useEffect(() => {
    function animateUniform(
      propName: keyof typeof material.uniforms,
      min: number,
      max: number,
      durationMin: number,
      durationMax: number
    ) {
      const animate = () => {
        const newValue = min + Math.random() * (max - min);
        const newDuration =
          durationMin + Math.random() * (durationMax - durationMin);
        gsap.to(material.uniforms[propName], {
          value: newValue,
          duration: newDuration,
          ease: "sine.inOut",
          onComplete: animate,
        });
      };
      animate();
    }

    animateUniform("uDisplacementStrength", 0.3, 0.7, 2, 4);
    animateUniform("uDistortionStrength", 1.0, 2.0, 3, 5);
    animateUniform("uFresnelMultiplier", 5, 4.5, 2, 4);
    animateUniform("uDisplacementFrequency", 2.0, 3.0, 3, 6);
    animateUniform("uDistortionFrequency", 1.5, 2.5, 3, 6);

    function animateOffset() {
      gsap.to(material.uniforms.uOffset.value, {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        duration: 4 + Math.random() * 2,
        ease: "sine.inOut",
        onComplete: animateOffset,
      });
    }
    animateOffset();
  }, [material]);

  // Update the time uniform on each frame
  //@ts-ignore
  useFrame((state, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value += delta;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

export default Sphere;
