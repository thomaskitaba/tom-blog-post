import schoolCompound0 from '../assets/img/school-compound-0.png';
import {Swiper, SwiperSlide} from 'swiper/react';

const Slider = ({SliderJson}) => {
  return (
    <>
      {SliderJson.map((item, index) =>
        (<div> item.description </div>)
      ) }
    </>
  )
}
export default Swiper;