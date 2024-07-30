
import {Swiper, SwiperSlide} from 'swiper/react';
import {useEffect} from 'react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Slider = ({SliderJson}) => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // whether animation should happen only once
      offset: 200 // change the distance from the original position to start the animation
    });
  }, []);
  return (

    <>
    <div className="slide-container-all">
      <div className="slider-title">
          <div id="slider-title">Services</div>
      </div>
      <div className="slider-container">
        <div className="swiper-container">
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {SliderJson.map((item, index) =>
                  <SwiperSlide>
                    <div className='swiper-card' >
                      <div className='swiper-card-fancy'> </div>

                      <div className="item-defintion-and-image" data-aos='fade-right'>
                        <div className={item.imageUrl}>
                          <div className='item-title title.color'>
                            {item.title}
                          </div>
                        </div>
                        <div className='item-definition'>
                           {item.definition}
                        </div>
                      </div>
                      <div className='item-description' data-aos='fade-left'>{item.description} </div>
                    </div>
                  </SwiperSlide>
                ) }
          </Swiper>
        </div>
      </div>
    </div>
    </>
  )
}
export default Slider;
