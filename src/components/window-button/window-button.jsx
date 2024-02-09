import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useCallback } from "react"

export default function WindowButton() {
  const { width, height } = useWindowDimensions();

  const handleWindowSize = useCallback(() => {
    alert(`WINDOW SIZE: width: ${width}px, height: ${height}px`);
  }, [width, height]);

  return (
    <button className="uppercase p-2 px-4 bg-purple-500 rounded-md min-w-32" onClick={handleWindowSize} type="button">Get Window Size</button>
  )
}