import { useEffect, useRef, useState } from "react";
import { Sector } from "../utils/radialSector";

type Direction = "forward" | "backward";

interface AnimationState {
  direction: Direction;
  images: string[];
  index: number;
}

interface ImageSetProps {
  sector: Sector;
  images: string[];
}

const imageSets: ImageSetProps[] = [
  { sector: "top", images: ["--center", "--t-1", "--t-2", "--t-3", "--t-4"] },
  { sector: "topRight", images: ["--center", "--tr-1", "--tr-2", "--tr-3", "--tr-4"] },
  { sector: "right", images: ["--center", "--r-1", "--r-2", "--r-3", "--r-4"] },
  { sector: "bottomRight", images: ["--center", "--br-1", "--br-2", "--br-3", "--br-4"] },
  { sector: "bottom", images: ["--center", "--b-1", "--b-2", "--b-3", "--b-4"] },
  { sector: "bottomLeft", images: ["--center", "--bl-1", "--bl-2", "--bl-3", "--bl-4"] },
  { sector: "left", images: ["--center", "--l-1", "--l-2", "--l-3", "--l-4"] },
  { sector: "topLeft", images: ["--center", "--tl-1", "--tl-2", "--tl-3", "--tl-4"] },
  { sector: "center", images: ["--center"] },
];

/**
 * Custom hook to animate images based on a specified sector.
 *
 * @param sector - A string representing the sector from which to get the images.
 * @param animationTime - The time interval (in milliseconds) between image transitions.
 * @returns The current image being displayed.
 */
export const useImageAnimator = (sector: string, animationTime = 50) => {
  const [currentImage, setCurrentImage] = useState("--center");
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState | null>(null);
  const animationRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const animateImages = (images: string[], direction: Direction) => {
    let index = direction === "forward" ? 0 : images.length - 1;

    // If there is only one image, just set it and return
    if (images.length <= 1) {
      setCurrentImage(images[index]);
      return;
    }

    setCurrentAnimation({ direction, images, index });

    // Start the animation
    animationRef.current = setInterval(() => {
      const finished =
        (direction === "forward" && index >= images.length) ||
        (direction === "backward" && index < 0);

      if (finished) {
        clearInterval(animationRef.current);
        setCurrentAnimation(null);
        return;
      }

      // Update the current animation state
      setCurrentAnimation((prev) => (prev ? { ...prev, index } : null));

      // Update the current image
      setCurrentImage(images[index]);
      index = direction === "forward" ? index + 1 : index - 1;
    }, animationTime);
  };

  useEffect(() => {
    const newSet = imageSets.find((set) => set.sector === sector);
    if (!newSet) return;

    // Stop the current animation
    clearInterval(animationRef.current);
    clearTimeout(timeoutRef.current);

    // If there is a current animation, first reverse it, then start new one
    if (currentAnimation) {
      const reversedImages = [...currentAnimation.images].slice(0, currentAnimation.index + 1);
      animateImages(reversedImages, "backward");

      // Start the new animation after the reversed images
      timeoutRef.current = setTimeout(() => {
        animateImages(newSet.images, "forward");
      }, reversedImages.length * animationTime + animationTime);
    } else {
      // Default way, start new animation
      if (currentImage === "--center") {
        animateImages(newSet.images, "forward");
      }
      // If return to center, just reverse existing set to center
      else if (newSet.sector === "center") {
        const currentSet = imageSets.find((set) => set.images.includes(currentImage));
        currentSet && animateImages(currentSet.images, "backward");
      }
      // If quickly snaps between sectors, animate only last image
      else {
        animateImages([newSet.images[newSet.images.length - 1]], "forward");
      }
    }

    return () => {
      clearInterval(animationRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [sector]);

  return currentImage;
};
