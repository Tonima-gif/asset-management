
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import banner1 from "../assets/assets/banner1.jpeg"
import banner2 from "../assets/assets/banner2.jpg"
import { Link } from 'react-router-dom';


const Banner=()=> {

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide>
            <div style={{backgroundImage:`url(${banner1})`,backgroundSize:"cover"}}>
            <div className='h-[480px] bg-black bg-opacity-30 py-40'>
<div className='text-center bg-black bg-opacity-80 py-8 md:px-40 rounded-md border border-white w-fit mx-auto'>
    <h1 className='text-white text-4xl font-bold py-3'>Join as an Employee</h1>
    <Link className='text-white text-base bg-purple-950 btn px-9 border border-white font-semibold'>Join</Link>
</div>
            </div>
            </div>
        </SwiperSlide>
        <SwiperSlide><div style={{backgroundImage:`url(${banner2})`,backgroundSize:"cover"}}>
            <div className='h-[480px] bg-black bg-opacity-30 py-40'>
            <div className='text-center bg-black bg-opacity-80 py-8 md:px-40 rounded-md border border-white w-fit mx-auto'>
    <h1 className='text-white text-4xl font-bold py-3'>Join as HR Manager</h1>
    <Link className='text-white text-base bg-purple-950 btn px-9 border border-white font-semibold'>Join</Link>
</div>
            </div>
            </div></SwiperSlide>
      </Swiper>
    </>
  );
}
export default Banner
