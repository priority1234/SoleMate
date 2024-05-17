import { Carousel } from "@material-tailwind/react";

function HeroSection() {
  return (
    <div className=" z-50 mb-[0.5em]  lg:mb-[0.7em]">
      <Carousel
        navigation={false}
        transition={{ type: "tween", duration: 2 }}
        autoplay={true}
        autoplayDelay={5000}
        loop={true}
        className="rounded-none z-10"
      >
        <img
          src="../img/banner/banner1.png"
          alt="image 1"
          className="w-[100%] h-[8em] xl:h-[28em] lg:h-[18em] md:h-[20em] sm:h-[12em] "
        />
        <img
          src="../img/banner/banner2.png"
          alt="image 2"
          className="w-[100%] h-[8em] xl:h-[28em] lg:h-[18em]  md:h-[20em] sm:h-[12em]"
        />
        <img
          src="../img/banner/banner3.png"
          alt="image 3"
          className="w-[100%] h-[8em] xl:h-[28em] lg:h-[18em]  md:h-[20em] sm:h-[12em]"
        />
      </Carousel>
    </div>
  );
}

export default HeroSection;