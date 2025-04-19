import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type AnimatedTextProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
};

const blink = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
`;

const TextWrapper = styled.span`
  font-family: monospace;
  font-size: 1.5rem;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background-color: var(--text-color);
  margin-left: 2px;
  animation: ${blink} 1s step-start infinite;
  vertical-align: bottom;
`;

function AnimatedText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
}: AnimatedTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    texts,
    currentTextIndex,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts,
  ]);

  return (
    <TextWrapper>
      {displayedText}
      <Cursor />
    </TextWrapper>
  );
}

export default AnimatedText;
