"use client";

import { useEffect, useState } from "react";

const useCarousel = ({ length }: { length?: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000); // change slide every 3s
    return () => clearInterval(interval);
  }, [length]);
  return { current };
};

export default useCarousel;
