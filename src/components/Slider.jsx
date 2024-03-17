import schoolCompound0 from '../assets/img/school-compound-0.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = ({SliderJson}) => {
  return (

    <>
    <div className="slide-container-all">
      <div className="slider-title">
          <h1>Services</h1>
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
                    <div className='swiper-card'>
                      <div className='item-title'>
                        {item.title}
                      </div>
                      <div className="item-defintion-and-image">
                        <div className={item.imageUrl}></div>
                        <div className='item-definition'>
                           {item.definition}
                        </div>
                      </div>
                      <div className='item-description'>{item.description} </div>
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