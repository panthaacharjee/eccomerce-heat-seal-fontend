"use client";
import React, { useState } from "react";
import ImageCarousel, { CarouselImage } from "./ImageCarousel";

const ExampleCarousel: React.FC = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Animated Image Carousel
          </h1>
          <p className="text-gray-300 text-lg">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </header>

        <div className="mb-10">
          <ImageCarousel
            images={carouselImages}
            autoPlay={autoPlay}
            autoPlayInterval={3000}
            showNavigation={showNavigation}
            showIndicators={showIndicators}
            transitionDuration={transitionSpeed}
          />
        </div>

        {/* Controls Panel */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Controls</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Auto Play Toggle */}
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={autoPlay}
                    onChange={(e) => setAutoPlay(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full transition-all duration-300 ${
                      autoPlay ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                      autoPlay ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="text-white font-medium">Auto Play</span>
              </label>
            </div>

            {/* Navigation Toggle */}
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showNavigation}
                    onChange={(e) => setShowNavigation(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full transition-all duration-300 ${
                      showNavigation ? "bg-green-500" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                      showNavigation ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="text-white font-medium">
                  Navigation Arrows
                </span>
              </label>
            </div>

            {/* Indicators Toggle */}
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showIndicators}
                    onChange={(e) => setShowIndicators(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full transition-all duration-300 ${
                      showIndicators ? "bg-purple-500" : "bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                      showIndicators ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <span className="text-white font-medium">Slide Indicators</span>
              </label>
            </div>

            {/* Transition Speed Control */}
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <label className="block mb-2">
                <span className="text-white font-medium block mb-2">
                  Transition Speed: {transitionSpeed}ms
                </span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="100"
                  value={transitionSpeed}
                  onChange={(e) => setTransitionSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </label>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">
              Keyboard Shortcuts
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg font-mono">
                  ←
                </kbd>
                <span className="text-gray-300">Previous slide</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg font-mono">
                  →
                </kbd>
                <span className="text-gray-300">Next slide</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg font-mono">
                  Space
                </kbd>
                <span className="text-gray-300">Pause/Play autoplay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-transparent p-6 rounded-2xl border border-blue-800/30">
            <h3 className="text-xl font-bold text-white mb-3">
              🚀 Smooth Animations
            </h3>
            <p className="text-gray-300">
              CSS transitions with configurable duration for silky smooth slide
              transitions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-transparent p-6 rounded-2xl border border-purple-800/30">
            <h3 className="text-xl font-bold text-white mb-3">
              🎨 Customizable
            </h3>
            <p className="text-gray-300">
              Control autoplay, navigation, indicators, and transition speed.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-transparent p-6 rounded-2xl border border-green-800/30">
            <h3 className="text-xl font-bold text-white mb-3">⌨️ Accessible</h3>
            <p className="text-gray-300">
              Keyboard navigation, ARIA labels, and proper focus management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCarousel;
