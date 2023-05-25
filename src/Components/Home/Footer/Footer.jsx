/** @format */

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseFollower from "mouse-follower";
import footerVid from "@assets/vids/footer-3.mp4";
import "./Footer.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  MouseFollower.registerGSAP(gsap);
  const cursor = new MouseFollower();

  const [emailCopied, setEmailCopied] = useState(false);
  const footerContainer = useRef(null);
  const heading0 = useRef(null);
  const heading1 = useRef(null);

  useEffect(() => {
    //container parallax
    gsap.fromTo(
      footerContainer.current,
      {
        y: () => -window.innerHeight,
      },
      {
        y: 0,
        scrollTrigger: {
          trigger: footerContainer.current,
          scrub: true,
          start: "center bottom",
          end: "bottom top",
        },
      }
    );
    // set stick to footer
    cursor.setStick(footerContainer.current);

    //heading scroll trigger opening
    gsap.fromTo(
      [heading0.current, heading1.current],
      {
        rotation: 6,
        opacity: 0,
        y: (i, el) => el.clientHeight * 0.5,
      },
      {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.easeOut",
        scrollTrigger: {
          trigger: footerContainer.current,
          start: "center center",
        },
      }
    );
  }, []);

  const personalLinks = [
    { label: "Email", value: "jpearsonbusiness@gmail.com" },
    { label: "LinkedIn", value: "http://www.linkedin.com/in/jakepearson123" },
    { label: "Dribbble", value: "https://dribbble.com/jopearson" },
    { label: "Behance", value: "https://www.behance.net/jakepearson5" },
    { label: "GitHub", value: "https://github.com/DaCodeWiz" },
  ];

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("jpearsonbusiness@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 3000);
  };

  return (
    <footer className="center" ref={footerContainer}>
      <div id="footer-content" className="content-width column">
        <h2>
          <div className="anim">
            <div ref={heading0}>Jake</div>
          </div>
          <div className="anim">
            <div ref={heading1}>Pearson</div>
          </div>
        </h2>
        <p>creativity driven with a passionate focus on innovation.</p>
        <hr />
        <div id="footer-final-p" className="block">
          <div className="footer-list">
            <ul className="link-list">
              {personalLinks.map(({ label, value }) => (
                <li key={label}>
                  {label === "Email" ? (
                    <button
                      className="copy-btn"
                      data-cursor-text="Copy?"
                      onClick={() => {
                        navigator.clipboard.writeText(value);
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 5000);
                      }}
                    >
                      {emailCopied ? "Copied!" : label}
                    </button>
                  ) : (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="background">
        <video
          playsInline
          loop
          muted
          disablePictureInPicture
          src={footerVid}
          type="video/mp4"
          autoPlay
        />
      </div>
    </footer>
  );
}
