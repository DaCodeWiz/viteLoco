import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./VideoPlayer";
import bgVid from "@assets/vids/promo.mp4";
import MouseFollower from "mouse-follower";
import "./Reel.scss";

MouseFollower.registerGSAP(gsap);
gsap.registerPlugin(ScrollTrigger);

function HomeReel() {
  const cursor = new MouseFollower();
  const [isPlaying, setIsPlaying] = useState(false);

  const video = useRef(null);
  const container = useRef(null);
  const heading0 = useRef(null);
  const heading1 = useRef(null);
  // get el by id
  const reelContainer =
    document.getElementById("reel-container") | useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        scrub: 0.99,
        onEnter: () => video.current.play(),
        pinSpacing: true,
        pin: true,
        pinType: "fixed",
        start: "top top",
      },
    });
    // Scale Video to fill container
    tl.to(video.current, { scale: 1 }, 0);

    // Headings
    tl.to(heading0.current, { x: 0 }, 0);
    tl.to(heading1.current, { x: 0 }, 0);

    return () => {
      tl.kill();
    };
  }, [container.current, video.current, heading0.current, heading1.current]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScroll = () => {
    if (isPlaying) setIsPlaying(false);
  };

  return (
    <div id="reel-wrapper" data-cursor-text="Full Screen?">
      <div
        id="reel-container"
        className="center column"
        ref={container}
        onClick={handleClick}
        onWheel={handleScroll}
      >
        <div className="row center" id="reel-top-p">
          <svg
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            data-v-669b4a84=""
          >
            <path
              d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
              fill="currentColor"
              data-v-669b4a84=""
            ></path>
          </svg>
          <p>Visual Extraordinaire</p>
        </div>
        <div className="row center">
          <h2 ref={heading0}>Need</h2>
          <video
            src={bgVid}
            playsInline
            loop
            muted
            ref={video}
            className="video"
          />
          <h2 ref={heading1}>Something?</h2>
        </div>
        <p id="reel-bottom-p">
          I know thing or two
          <br />
          about the creative suite
        </p>
      </div>
      {isPlaying ? (
        <VideoPlayer handleClick={handleClick} handleScroll={handleScroll} />
      ) : null}
    </div>
  );
}

export default HomeReel;
