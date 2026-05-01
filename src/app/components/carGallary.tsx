import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarImageGalleryProps {
  images: string[]; // Array of image URLs
  alt?: string;
}

export function CarImageGallery({ images, alt = "Car image" }: CarImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Filter out any empty URLs from the array
  const imageUrls = images?.filter(url => url?.trim()) || [];
  
  const hasMultipleImages = imageUrls.length > 1;

  // Stop event propagation for all gallery interactions
  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  // Navigation functions with stop propagation
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < imageUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollToImage(currentIndex + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToImage(currentIndex - 1);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const imageElement = container.children[index] as HTMLElement;
      if (imageElement) {
        imageElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // Handle scroll events to update current index
  const handleScroll = () => {
    if (scrollContainerRef.current && !isDragging) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const imageWidth = container.children[0]?.clientWidth || 0;
      if (imageWidth > 0) {
        const newIndex = Math.round(scrollPosition / imageWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < imageUrls.length) {
          setCurrentIndex(newIndex);
        }
      }
    }
  };

  // Mouse/Touch drag for horizontal scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
    scrollToImage(index);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isDragging]);

  if (imageUrls.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-sm">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group" onClick={stopPropagation}>
      {/* Main Image Container with Horizontal Scroll */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar h-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={stopPropagation}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-center h-full"
          >
            {images.length >= 1 ?
              
          
            <img
              src={url}
              alt={`${alt} - ${index + 1}`}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png";
              }}
              onClick={stopPropagation}
            /> : 
            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" alt="No Image Found"  className="w-full h-48 object-cover"/>
              }
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Only show on hover or if multiple images */}
      {hasMultipleImages && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          
          {currentIndex < imageUrls.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all z-10"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </>
      )}

      {/* Dots Indicator */}
      {hasMultipleImages && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={(e) => handleDotClick(e, index)}
              className={`transition-all rounded-full ${
                currentIndex === index 
                  ? 'bg-white w-2 h-2' 
                  : 'bg-white/50 w-1.5 h-1.5 hover:bg-white/75'
              }`}
              style={{ pointerEvents: 'auto' }}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-md z-10">
          {currentIndex + 1} / {imageUrls.length}
        </div>
      )}
    </div>
  );
}