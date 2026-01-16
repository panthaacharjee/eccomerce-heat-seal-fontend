"use client";
import React, { useState } from "react";
import ImageCarousel, { CarouselImage } from "./ImageCarousel";

const Carousel: React.FC = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);
  const [transitionSpeed, setTransitionSpeed] = useState(500);

  // Sample images - replace with your own images
  const carouselImages: CarouselImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Mountain landscape",
      title: "Majestic Mountains",
      description: "Beautiful mountain range at sunset",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
      alt: "Beach sunset",
      title: "Tropical Beach",
      description: "Golden hour at a peaceful beach",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
      alt: "Forest path",
      title: "Enchanted Forest",
      description: "Sunlight filtering through dense forest",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000",
      alt: "Northern lights",
      title: "Aurora Borealis",
      description: "Colorful aurora in the night sky",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1",
      alt: "Ocean waves",
      title: "Ocean Waves",
      description: "Powerful waves crashing on rocks",
    },
  ];

  return (
    <div className="">
      <div className="container w-full mx-auto">
        <div className="">
          <ImageCarousel
            images={carouselImages}
            autoPlay={autoPlay}
            autoPlayInterval={3000}
            showNavigation={showNavigation}
            showIndicators={showIndicators}
            transitionDuration={transitionSpeed}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
