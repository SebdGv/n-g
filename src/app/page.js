"use client";

import { useEffect, useState } from "react";
import Title from "./components/titles/title";
import "./home.css";

export default function Home() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Fonction pour calculer le nombre de blocs nécessaires
    const calculateBlocks = () => {
      const container = document.querySelector(".hover-container");
      if (!container) return;
      // Obtenir les dimensions du conteneur
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Définir la taille des blocs en fonction de la largeur d'écran
      const blockWidth = window.innerWidth <= 900 ? 25 : 50; // Ajuster selon media query
      const blockHeight = window.innerWidth <= 900 ? 25 : 50;
      const gap = window.innerWidth <= 900 ? 2 : 5; // gap entre les blocs selon votre CSS

      // Calculer combien de blocs peuvent tenir dans la grille
      // Tenir compte du gap entre les blocs
      const columns = Math.floor((containerWidth + gap) / (blockWidth + gap));
      const rows = Math.floor((containerHeight + gap) / (blockHeight + gap));
      const totalBlocks = columns * rows;

      // Générer le tableau de blocs
      const newBlocks = Array.from(
        { length: totalBlocks },
        (_, index) => index
      );
      setBlocks(newBlocks);
    };

    // Calculer initialement
    calculateBlocks();

    // Recalculer lors du redimensionnement de la fenêtre
    window.addEventListener("resize", calculateBlocks);

    // Nettoyage
    return () => {
      window.removeEventListener("resize", calculateBlocks);
    };
  }, []);

  useEffect(() => {
    // Appliquer l'effet de survol une fois les blocs générés
    const blockElements = document.querySelectorAll(".block");
    const resetDuration = 500;

    blockElements.forEach((block) => {
      let timeoutID;

      const handleMouseOver = () => {
        clearTimeout(timeoutID);
        block.classList.add("active");
        timeoutID = setTimeout(() => {
          block.classList.remove("active");
        }, resetDuration);
      };

      block.addEventListener("mouseover", handleMouseOver);

      return () => {
        block.removeEventListener("mouseover", handleMouseOver);
        clearTimeout(timeoutID);
      };
    });
  }, [blocks]); // Exécuter quand les blocs changent

  return (
    <div className="page-content hero container">
      <Title text="Esp; 24" />
      <div className="hover-container">
        <div className="hover-overlay"></div>
        <div className="hover-blocks">
          {blocks.map((index) => (
            <div className="block" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
