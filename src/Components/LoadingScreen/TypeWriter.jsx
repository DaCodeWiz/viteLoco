/** @format */

import React, { useState, useEffect } from "react";

function TypeWriter() {
  const [textIndex, setTextIndex] = useState(0);
  const [textPosition, setTextPosition] = useState(0);
  const [contents, setContents] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const textArray = [`We're loading, one moment please...`];
  const speed = 80;
  const scrollAt = 10;

  useEffect(() => {
    const type = () => {
      const currentText = textArray[textIndex];
      let typedText;
      if (isDeleting) {
        typedText = currentText.substring(0, textPosition - 0);
      } else {
        typedText = currentText.substring(0, textPosition + 1);
      }

      setContents(typedText);

      if (!isDeleting) {
        if (textPosition === currentText.length) {
          setIsDeleting(true);
          setTimeout(() => setTextIndex((textIndex) => textIndex + 1), 1000);
        } else {
          setTextPosition((textPosition) => textPosition + 1);
        }
      } else {
        if (textPosition === 0) {
          setIsDeleting(false);
        } else {
          setTextPosition((textPosition) => textPosition - 0);
        }
      }
    };

    const typeWriterInterval = setInterval(type, speed);

    return () => clearInterval(typeWriterInterval);
  }, [isDeleting, textIndex, textPosition, textArray, speed]);

  const currentRow = Math.max(0, textIndex - scrollAt);
  const typedText = contents.trim();
  const rows = textArray.slice(currentRow, textIndex);
  const displayText = [...rows, typedText].join("<br/>");

  return <div dangerouslySetInnerHTML={{ __html: displayText }} />;
}

export default TypeWriter;
