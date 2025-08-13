"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "New Arrivals",
      description:
        "Discover the latest summer trends with up to 50% off on selected items",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      buttonText: "Shop Summer Collection",
      buttonLink: "/shop?category=summer",
      bgColor: "from-orange-400 to-pink-500",
    },
    {
      id: 2,
      title: "Premium Fashion",
      subtitle: "Quality & Style",
      description:
        "Elevate your wardrobe with our premium collection of clothing and accessories",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
      buttonText: "Explore Premium",
      buttonLink: "/shop?category=premium",
      bgColor: "from-purple-500 to-blue-600",
    },
    {
      id: 3,
      title: "Casual Wear",
      subtitle: "Comfort Meets Style",
      description:
        "Comfortable and stylish casual wear for your everyday adventures",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
      buttonText: "Shop Casual",
      buttonLink: "/shop?category=casual",
      bgColor: "from-green-400 to-teal-500",
    },
    {
      id: 4,
      title: "Special Offers",
      subtitle: "Limited Time",
      description: "Don't miss out on our amazing deals and special discounts",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop",
      buttonText: "View Offers",
      buttonLink: "/shop?sortBy=discount",
      bgColor: "from-red-400 to-pink-500",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-full relative bg-gradient-to-r ${slide.bgColor} flex items-center`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-white max-w-2xl">
                <p className="text-sm md:text-base font-medium mb-2 opacity-90">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-xl">
                  {slide.description}
                </p>
                <Link
                  href={slide.buttonLink}
                  className="inline-block bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
