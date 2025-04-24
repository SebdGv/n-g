// menu.js
"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./menu.css";
import { useTheme } from "./styles/useTheme.js";
import "./styles/variables.css";

const menuLinks = [
  { path: "/", label: "Esp;24" },
  { path: "/vos22", label: "vos;22" },
  { path: "/rot23", label: "Rot;23" },
  { path: "/contact", label: "Contact" },
];

const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { themeName } = useTheme(); // Utilise notre hook custom
  const tl = useRef();

  useGSAP(
    () => {
      // Set initial positions
      gsap.set(".menu-link-item-holder", { y: 75 });
      gsap.set(".menu-bar", { y: -200, filter: "blur(10px)" });

      // Animate menu-bar to y:0 on load
      gsap.to(".menu-bar", {
        y: 0,
        filter: "blur(0px)",
        duration: 2.25,
        ease: "power4.out",
      });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="menu-container" ref={container} data-theme={themeName}>
      <div className="menu-bar">
        <div className="menu-logo logo">
          <Link href="/">Sb.</Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <p>open</p>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo logo">
            <Link href="/"> Sb.</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <p>close</p>
          </div>
        </div>
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index} onClick={toggleMenu}>
                <div className="menu-link-item-holder">
                  <Link href={link.path} className="menu-link">
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="#">Insta &#8599;</a>
              <a href="#">Linkedin &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>contact@sebastienberquez.com</p>
              <p>+33 43 33 63 53</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <p>&hearts;</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
