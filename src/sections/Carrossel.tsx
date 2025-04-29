import * as React from "react"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Lista de imagens para o carrossel
const images = [
  "/images/slide-1.png",
  "/images/slide-2.png",
  "/images/slide-3.png",
]

export default function Carrossel() {
  return (
    <Carousel className="w-full" opts={{loop: true}}>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={src}
                alt={`Imagem ${index + 1} da Galeria`}
                width={0} 
                height={0} 
                sizes="100vw" 
                className="w-full h-auto rounded-lg object-cover border-1 border-black shadow-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}