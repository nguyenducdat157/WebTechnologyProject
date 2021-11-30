import { useEffect, useState } from "react";
import "./slide.css";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.png";
const Slide = () => {
  const [countSilde, setCountSlide] = useState(1);
  const [activeSilde, setActiveSlide] = useState(true);
  useEffect(() => {
    activeSilde &&
      setTimeout(
        () =>
          setCountSlide((prevIndex) => (prevIndex === 3 ? 1 : prevIndex + 1)),
        3000
      );
  }, [countSilde]);
  return (
    <>
      <div className="slideshow-container">
        {countSilde === 1 && (
          <div className="mySlides">
            <img src={slide1} style={{ width: "100%" }} />
          </div>
        )}
        {countSilde === 2 && (
          <div className="mySlides">
            <img src={slide2} style={{ width: "100%" }} />
          </div>
        )}

        {countSilde === 3 && (
          <div className="mySlides">
            <img src={slide3} style={{ width: "100%" }} />
          </div>
        )}

        <a
          className="slide__prev"
          onClick={() => {
            if (countSilde === 1) setCountSlide(3);
            else setCountSlide(countSilde - 1);
            setActiveSlide(false);
          }}
        >
          &#10094;
        </a>
        <a
          className="slide__next"
          onClick={() => {
            if (countSilde === 3) setCountSlide(1);
            else setCountSlide(countSilde + 1);
            setActiveSlide(false);
          }}
        >
          &#10095;
        </a>
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        <span
          className={`slide__dot ${countSilde === 1 ? "slide__active" : ""}`}
          onClick={() => {
            setCountSlide(1);
            setActiveSlide(false);
          }}
        ></span>
        <span
          className={`slide__dot ${countSilde === 2 ? "slide__active" : ""}`}
          onClick={() => {
            setCountSlide(2);
            setActiveSlide(false);
          }}
        ></span>
        <span
          className={`slide__dot ${countSilde === 3 ? "slide__active" : ""}`}
          onClick={() => {
            setCountSlide(3);
            setActiveSlide(false);
          }}
        ></span>
      </div>
    </>
  );
};

export default Slide;
