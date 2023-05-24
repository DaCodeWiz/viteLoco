/** @format */

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import TypeWriter from "./TypeWriter";
import "./Loading.scss";

export default function Loading() {
  const preloader = useRef(null);
  const loader = useRef(null);
  const typedtext = useRef(null);

  useEffect(() => {
    const animate = () => {
      gsap.fromTo(
        loader.current,
        {
          // from
          scale: 1,
        },
        {
          // to
          duration: 1,
          scale: 5,
          delay: 1.6,
          ease: "power4.inOut",
        }
      );
      gsap.fromTo(
        preloader.current,
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: 1.6,
          y: "-100vh",
          delay: 1.8,
          ease: "power4.inOut",
        }
      );
      gsap.fromTo(
        typedtext.current,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          y: "-20vh",
          duration: 1.59,
          delay: 1.38,
          ease: "power4.inOut",
        }
      );
      TypeWriter();
    };
    setTimeout(() => requestAnimationFrame(animate), 1300);
  }, []);

  return (
    <div id="preloader" ref={preloader}>
      <div id="loader" ref={loader}></div>
      <div id="typedtext" ref={typedtext}>
        <TypeWriter />
      </div>
    </div>
  );
}
