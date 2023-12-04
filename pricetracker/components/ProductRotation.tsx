"use client"
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const ProductImageRotation = [
  {imageUrl:  '/hero-1.svg', alt: 'apple watch'},
  {imageUrl: '/hero-2.svg', alt: 'bag'},
  {imageUrl: '/hero-3.svg', alt: 'lamp'},
  {imageUrl: '/hero-4.svg', alt: 'air fryer'},
  {imageUrl: '/hero-5.svg', alt: 'chair'},
]
const ProductRotation = () => {
  return (
    <div className="hero-carousel">
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} interval={3000} showArrows={false} showStatus={false} >
        {ProductImageRotation.map((image) => ( 
          <Image className="object-contain" key={image.alt} src={image.imageUrl} alt={image.alt} width={484} height={484} />
         ) )}
      </Carousel>
    </div>
  );
};

export default ProductRotation;
