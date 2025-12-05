"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const isVideoLoaded = () => {
  const video = document.querySelector(".hero-video") as HTMLVideoElement;
  // return video && video.readyState >= 4;
  return true;
};

function areAllAssetsLoaded() {
  if (typeof document === "undefined") return false;
  
  // Check if all fonts are loaded
  const fontsLoaded = document.fonts.status === "loaded";

  // Check if all images are loaded
  const heroImg = document.querySelectorAll(".heroImg");
  const imagesLoaded = Array.from(heroImg).every(
    (img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalHeight !== 0
  );

  return isVideoLoaded() && fontsLoaded && imagesLoaded;
}

const loadAOS = () => {
  AOS.init({
    duration: 800,
    once: true,
  });
};

const showUI = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
};

const onAllAssetsLoaded = () => {
  loadAOS();
  showUI();
};

function checkAssetsPeriodically() {
  const intervalId = setInterval(() => {
    if (areAllAssetsLoaded()) {
      clearInterval(intervalId);
      onAllAssetsLoaded();
    }
  }, 100);
}

const useAos = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Immediately check assets
    if (areAllAssetsLoaded()) {
      onAllAssetsLoaded();
    } else {
      checkAssetsPeriodically();
    }

    // Cleanup on component unmount
    return () => {
      // AOS.refresh();
    };
  }, []);
};

export default useAos;

