import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  { image: "/images/hero-1.jpg", alt: "Ultimate frisbee diving catch" },
  { image: "/images/hero-2.jpg", alt: "Team huddle on the field" },
  { image: "/images/hero-3.jpg", alt: "Powerful disc throw" },
];

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="home" className="relative h-screen w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 4000 })]}
        className="h-full w-full"
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-screen pl-0 relative">
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-8 left-4 right-4 container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" /><span className="sr-only">Previous slide</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-muted-foreground/30 hover:border-primary hover:bg-primary/10" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" /><span className="sr-only">Next slide</span>
            </Button>
          </div>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 transition-all duration-300 rounded-full ${current === index ? "w-8 bg-primary" : "w-4 bg-muted-foreground/50 hover:bg-muted-foreground"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
