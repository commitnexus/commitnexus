import React, { useEffect, useState } from "react";
import "./ImageTextSlider.css";

import image1 from "./images/share1.png";
import image2 from "./images/share1.png";
import image3 from "./images/share2.png";

const images = [
    {
      src: image1,
      text: `<h2>Step 1: Visit the Website</h2>
             <p>Go to <strong>commitenexus.xyz</strong> on your device. No sign-up needed for instant transfers!</p>`
    },
    {
      src: image2,
      text: `<h2>Step 2: Get 4-digit Code</h2>
             <p>Click “Upload” and get your 4-digit file code instantly.</p>`
    },
    {
      src: image3,
      text: `<h2>Step 3: Share & Download</h2>
             <p>Send the code or QR to your friend and download on any device!</p>`
    },
  ];
  

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container2">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div className="slide" key={index}>
          <div dangerouslySetInnerHTML={{ __html: item.text }} />
          <img src={item.src} alt={`Slide ${index}`} />
        </div>        
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
