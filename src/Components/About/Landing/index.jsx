import React, { useState, useEffect } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.scss";

MouseFollower.registerGSAP(gsap);
function index() {
  gsap.registerPlugin(ScrollTrigger);
  const cursor = new MouseFollower();
  const [emailCopied, setEmailCopied] = useState(false);
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

  useEffect(() => {
    const textElements = document.querySelectorAll(".fade-in-text");

    // Set up the fade-in animation for each text element
    textElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: "1vh" }, // Initial state
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.in",
          scrollTrigger: {
            trigger: element,
            start: "top 95%", // Adjust this value to control when the fade-in effect starts
          },
        }
      );
    });
  }, []);

  return (
    <div className="about" data-cursor="-inverse">
      <div className="right-col fade-in-text">
        <h3 className="top-text">
          I'm a student who is mesmerized by clean visuals. Whether it by
          scenery in the outdoors or a well designed website, I love to see it.
          I'm currently learning web development and I'm excited to see where it
          takes me. <br />
        </h3>
        <h3 className="bottom-text">
          I put a strong focus on interaction in my projects in hopes that
          they're be what sets me apart from others. I'm always looking for new
          ways to make my projects more interactive and engaging.{" "}
        </h3>
        <div className="group fade-in-text">
          <ul>
            <li>
              <h3>Experience</h3>
            </li>
            <li>
              <h4>
                I'm looking to break into the professional tech realm so right
                now it's mainly independent projects.
              </h4>
            </li>
            <li>
              <h4 className="special">Freelance Developer</h4>
            </li>
            <li>
              <p>2022 - Present</p>
            </li>
            <li>
              <h3>Contact Me</h3>
            </li>
            <ul className="bottom-list fade-in-text">
              {personalLinks.map(({ label, value }) => (
                <li key={label}>
                  {label === "Email" ? (
                    <button
                      className="copy-btn flip-animate"
                      data-cursor-text="Copy?"
                      onClick={() => {
                        navigator.clipboard.writeText(value);
                        setEmailCopied(true);
                        setTimeout(() => setEmailCopied(false), 5000);
                      }}
                    >
                      <span data-hover="Flip">
                        {emailCopied ? "Copied!" : label}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={value}
                      className="flip-animate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span data-hover={label}>{label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default index;
