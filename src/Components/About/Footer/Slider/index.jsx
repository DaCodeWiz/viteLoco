/** @format */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from '@studio-freight/lenis';
import wallpaper0 from '@assets/sliderImages/dbz.webp';
import wallpaper1 from '@assets/sliderImages/don.webp';
import wallpaper2 from '@assets/sliderImages/demon.webp';
import wallpaper3 from '@assets/sliderImages/genji.webp';
import wallpaper4 from '@assets/sliderImages/kendrick.webp';
import wallpaper5 from '@assets/sliderImages/rl.webp';
import "./styles.scss";

function index() {
  const imageTrackRef = useRef(null);

  useEffect(() => {

    const lenis = new Lenis({
      lerp: 0.04,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("lenis-scroll");

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleOnDown = (e) =>
      (imageTrackRef.current.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      imageTrackRef.current.dataset.mouseDownAt = "0";
      imageTrackRef.current.dataset.prevPercentage =
        imageTrackRef.current.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (imageTrackRef.current.dataset.mouseDownAt === "0") return;

      const mouseDelta =
        parseFloat(imageTrackRef.current.dataset.mouseDownAt) - e.clientX;
      const maxDelta = window.innerWidth / 1;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained =
        parseFloat(imageTrackRef.current.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(
        Math.min(nextPercentageUnconstrained, 0),
        -100
      );

      imageTrackRef.current.dataset.percentage = nextPercentage;

      imageTrackRef.current.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1050, fill: "forwards" }
      );

      for (const image of imageTrackRef.current.getElementsByClassName(
        "image"
      )) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1050, fill: "forwards" }
        );
      }
    };

    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = (e) => handleOnDown(e);

    window.ontouchstart = (e) => handleOnDown(e.touches[0]);

    window.onmouseup = (e) => handleOnUp(e);

    window.ontouchend = (e) => handleOnUp(e.touches[0]);

    window.onmousemove = (e) => handleOnMove(e);

    window.ontouchmove = (e) => handleOnMove(e.touches[0]);

    gsap.fromTo(
      imageTrackRef.current,
      { x: "100vw" },
      { x: "-25vw", duration: 2.17, delay: 0.57, ease: "power4.inOut" }
    );
   
  }, [requestAnimationFrame]);

  return (
    <div className="full">
      <div
        ref={imageTrackRef}
        className="image-track"
        data-mouse-down-at="0"
        data-prev-percentage="0"
      >
          <img alt="" className="image" data-cursor-text="Drag Images!" src={wallpaper0} draggable="false" />
          <img alt="" className="image" src={wallpaper1} draggable="false" />
          <img alt="" className="image" src={wallpaper2} draggable="false" />
          <img alt="" className="image" src={wallpaper3} draggable="false" />
          <img alt="" className="image" src={wallpaper4} draggable="false" />
          <img alt="" className="image" src={wallpaper5} draggable="false" />
      </div>
    </div>
  );
}

export default index;
