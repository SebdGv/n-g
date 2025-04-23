"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import "./title.css";

const Title = ({ text }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    // S'assurer que le DOM est chargé et la référence est disponible
    if (titleRef.current) {
      // Divisez le texte en lettres individuelles pour l'animation
      const chars = Array.from(text);

      // Vider le conteneur h1
      const h1Element = titleRef.current.querySelector("h1");
      h1Element.innerHTML = "";

      // Créer des spans pour chaque caractère
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block"; // Pour que chaque caractère puisse être animé
        span.style.opacity = 0; // Commence invisible
        h1Element.appendChild(span);
      });

      // Sélectionner tous les spans pour l'animation
      const charElements = h1Element.querySelectorAll("span");

      // Animation avec GSAP
      gsap.fromTo(
        charElements,
        {
          y: 400,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02, // Délai entre chaque lettre
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [text]); // Réexécuter si le texte change

  return (
    <div className="title" ref={titleRef}>
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
