import React, { useEffect, useState , useRef} from "react";
import Slider from "react-slick";
import { slideSlick } from "../../page-demo/script";

const SlideList = [
  {
      textPosition: 'text-center',
      bgImage: 'bg_image--39',
      category: '',
      title: 'Website Development',
      description: 'Boost your online presence with our web solutions.',
      descriptionTwo: 'We provide professional website development services.',
      buttonText: 'Contact Us',
      buttonLink: '/contact'
  },
  {
      textPosition: 'text-center',
      bgImage: 'bg_image--24',
      category: '',
      title: 'Ecommerce Development',
      description: 'Set up your ecommerce site with our Magento solutions.',
      descriptionTwo: 'Our team specializes in Adobe Commerce.',
      buttonText: 'Contact Us',
      buttonLink: '/contact'
  },
  {
      textPosition: 'text-center',
      bgImage: 'bg_image--42',
      category: '',
      title: 'Extension Development',
      description: 'Need custom features? We build Magento 2 extensions.',
      descriptionTwo: 'Get expert services tailored to your needs.',
      buttonText: 'Contact Us',
      buttonLink: '/contact'
  },
  {
      textPosition: 'text-center',
      bgImage: 'bg_image--11',
      category: '',
      title: 'Academic Project Assistance',
      description: 'We help students complete their academic projects.',
      descriptionTwo: 'Get professional guidance for your assignments.',
      buttonText: 'Contact Us',
      buttonLink: '/contact'
  }
];


const SliderOne = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % SlideList.length);
    }, 7000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [currentSlide]);

  return (
    <div className="slider-activation">
      <Slider ref={sliderRef} className="rn-slick-dot dot-light" {...slideSlick} initialSlide={currentSlide}>
        {SlideList.map((value, index) => (
          <div className={`slide slide-style-2 fullscreen d-flex align-items-center justify-content-center bg_image ${value.bgImage}`} key={index} data-black-overlay="8">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className={`inner ${value.textPosition}`}>
                    {value.category ? <span>{value.category}</span> : ''}
                    {value.title ? <h1 className="title theme-gradient">{value.title}</h1> : ''}
                    {value.description ? <p className="description">{value.description}</p> : ''}
                    {value.descriptionTwo ? <p className="description">{value.descriptionTwo}</p> : ''}
                    {value.buttonText ? <div className="slide-btn"><a className="rn-button-style--2 btn-primary-color" href={`${value.buttonLink}`}>{value.buttonText}</a></div> : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderOne;
