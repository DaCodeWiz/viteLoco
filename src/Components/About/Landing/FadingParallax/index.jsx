import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dbz from '@assets/sliderImages/dbz.webp';
import rl from '@assets/sliderImages/rl.webp';
import don from '@assets/sliderImages/don.webp';
import './styles.scss'

function FadingParallax() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const parallaxElement = parallaxRef.current;
    const images = parallaxElement.querySelectorAll(".parallax-image");

    // Set up the parallax effect for each image

      gsap.fromTo(
        images,
        { y: "10vh" },
        {
          y: "-150vh",
          scrollTrigger: {
            trigger: parallaxRef.current,
            scrub: true,
          },
        }
      );

    images.forEach((image) => {
      gsap.to(image, {
        scrollTrigger: {
          trigger: parallaxElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        opacity: 0, // Adjust this value as needed for the desired fading effect
        ease: "power2.inOut",
      });
    });
  }, []);

  return (
    <div className="parallax-container" ref={parallaxRef}>
      <img className="parallax-image" src={dbz} alt="Image 1" />
      <img className="parallax-image" src={rl} alt="Image 2" />
      <img className="parallax-image" src={don} alt="Image 3" />
    </div>
  );
}

export default FadingParallax;
