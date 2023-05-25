import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import frameData from "./frameData.json";
import "./styles.scss";

function Selfie() {
  gsap.registerPlugin(ScrollTrigger);

  const animationContainerRef = useRef(null);
  const { frames } = frameData;

  useEffect(() => {
    const animationContainer = animationContainerRef.current;
    const tl = gsap.timeline();

    // Calculate the scroll progress based on the scroll position within the component
    const calculateScrollProgress = () => {
      const containerTop = animationContainer.offsetTop;
      const containerHeight = animationContainer.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollPosition = scrollTop - containerTop;
      return Math.max(0, Math.min(scrollPosition / containerHeight, 1));
    };

    // Update the frame index based on the scroll progress
    const updateFrameIndex = () => {
      const scrollProgress = calculateScrollProgress();
      const newIndex = Math.floor(scrollProgress * (frames.length + 1));
      return newIndex;
    };

    if (animationContainerRef.current) {
      gsap.fromTo(
        animationContainerRef.current,
        { y: '10vh' },
        {
          y: '150vh',
          scrollTrigger: {
            trigger: animationContainerRef.current,
            scrub: true,
          },
        }
      );
    }

    // Create the timeline animation
    frames.forEach((frame, index) => {
      tl.to(animationContainerRef.current, {
        backgroundImage: `url(${frame})`,
        duration: 0.1,
        delay: index === 0 ? 0 : 0.1,
        overwrite: "auto",
        scrollTrigger: {
          trigger: animationContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: () => {
            const frameIndex = updateFrameIndex();
            animationContainerRef.current.style.backgroundImage = `url(${frames[frameIndex]})`;
          },
        },
      });
    });

    // Clean up the scroll trigger on component unmount
    // return () => {
    //   tl.kill();
    // };
  }, [frames]);

  return (
    <div className="selfie-animation" ref={animationContainerRef}>
      <div className="animation-container"></div>
    </div>
  );
}

export default Selfie;
