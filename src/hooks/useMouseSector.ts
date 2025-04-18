import { useEffect, useState } from "react";
import { Sector, getSectorByAngle } from "../utils/radialSector";
import { useDispatch } from "react-redux";
import { setSector } from "../redux/sectorSlice";

const useMouseSector = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isPortrait: boolean
) => {
  const dispatch = useDispatch();
  const [currentSector, setCurrentSector] = useState<Sector | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef?.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const sector = getSectorByAngle(cx, cy, e.clientX, e.clientY, isPortrait);
      if (sector && sector !== currentSector) {
        setCurrentSector(sector);
        dispatch(setSector(sector));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentSector, containerRef, dispatch, isPortrait]);

  return currentSector;
};

export default useMouseSector;
