"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Title from "../components/titles/title";
import { default as img1, default as img5 } from "./img1.png";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import "./vos22.css";

const imageData = [
  { id: 1, src: img1, alt: "Image 1", width: 25, delay: 0 },
  { id: 2, src: img2, alt: "Image 2", width: 12, delay: 0.15 },
  { id: 3, src: img3, alt: "Image 3", width: 18, delay: 0.3 },
  { id: 4, src: img4, alt: "Image 4", width: 25, delay: 0.45 },
  { id: 5, src: img5, alt: "Image 5", width: 12, delay: 0.6 },
];

const GAP_SIZE = 0.8;

const Page = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const containers = imageRefs.current.filter(Boolean);
    if (!containers.length) return;

    const tl = gsap.timeline();

    // Calcul simplifié des positions horizontales finales
    const finalPositions = [];
    let currentPosition = 0;

    imageData.forEach((image, index) => {
      finalPositions[index] = currentPosition;
      currentPosition += image.width + GAP_SIZE; // Ajoute la largeur + l'espacement
    });

    // Positionnement initial pour toutes les images (centré)
    containers.forEach((container, index) => {
      gsap.set(container, {
        position: "absolute",
        width: `${imageData[index].width}vw`,
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
      });
    });

    // Animation 1: Ouverture en rideau (séquentielle)
    containers.forEach((container, index) => {
      tl.to(
        container,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.4,
          ease: "power2.out",
          delay: 0.7,
        },
        imageData[index].delay
      );
    });

    // Animation 2: Déplacement vers des positions horizontales distinctes
    const tl2 = gsap.timeline({ delay: 1.2 });

    containers.forEach((container, index) => {
      const image = imageData[index];
      tl2.to(
        container,
        {
          top: 0,
          left: `${finalPositions[index]}vw`, // Position horizontale calculée
          xPercent: 0,
          yPercent: 0,
          duration: 0.7,
          ease: "power3.inOut",
          delay: 0.4,
        },
        0 // Toutes les animations commencent en même temps
      );
    });

    return () => {
      tl.kill();
      tl2.kill();
    };
  }, []);

  return (
    <div className="vos22-page page-content">
      <Title text="Vos;22" />
      <div className="images-container" ref={containerRef}>
        {imageData.map((image, index) => (
          <div
            key={image.id}
            className={`image-container image-container-${image.id}`}
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={0}
              style={{ width: "100%", height: "auto" }}
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
