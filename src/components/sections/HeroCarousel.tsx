"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
  title: string;
  credit: string;
};

type HeroCarouselProps = {
  images: CarouselImage[];
};

export function HeroCarousel({ images }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [images.length]);

  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-lotus-100 bg-white p-3 shadow-soft">
      <div className="relative grid min-h-[340px] place-items-center overflow-hidden rounded-md bg-[#fffdf8] ring-1 ring-indigoInk/10 sm:min-h-[420px]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width={1024}
          height={720}
          priority={activeIndex === 0}
          unoptimized
          className="max-h-[330px] w-full object-contain p-3 transition-opacity duration-500 sm:max-h-[410px]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-indigoInk/85 to-transparent p-4 text-white">
          <p className="text-base font-bold">{activeImage.title}</p>
          <p className="mt-1 text-xs leading-5 text-white/75">
            {activeImage.credit}
          </p>
        </div>
        <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
          <button
            type="button"
            onClick={showPrevious}
            className="grid size-10 place-items-center rounded-full bg-white/90 text-lg font-bold text-indigoInk shadow-soft transition hover:bg-white"
            aria-label="Previous cultural image"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={showNext}
            className="grid size-10 place-items-center rounded-full bg-white/90 text-lg font-bold text-indigoInk shadow-soft transition hover:bg-white"
            aria-label="Next cultural image"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`size-2.5 rounded-full transition ${
              index === activeIndex ? "bg-lotus-500" : "bg-indigoInk/20"
            }`}
          aria-label={`Show ${image.title}`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs leading-5 text-indigoInk/55">
        Real cultural imagery with source attribution shown in the carousel.
      </p>
    </div>
  );
}
